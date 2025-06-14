import React, { useState } from 'react';
import {
    Box,
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Tabs,
    Tab,
    Grid,
    Divider,
    Alert,
    CircularProgress
} from '@mui/material';
import Barcode from 'react-barcode';

const API_BASE_URL = 'https://logistics-backend-hu3k.onrender.com';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [form, setForm] = useState({
        senderName: '',
        senderAddress: '',
        receiverName: '',
        receiverAddress: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [labelData, setLabelData] = useState(null);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError('');
            
            const response = await fetch(`${API_BASE_URL}/api/generate-label`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form)
            });

            if (!response.ok) {
                throw new Error('Failed to generate label');
            }

            const data = await response.json();
            setLabelData(data);
            setActiveTab(1);
        } catch (err) {
            setError('Failed to generate label. Please try again.');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        try {
            setLoading(true);
            setError('');
            
            const response = await fetch(`${API_BASE_URL}/api/download-label/${labelData.deliveryId}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error('Failed to download label');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `delivery-label-${labelData.deliveryId}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err) {
            setError('Failed to download label. Please try again.');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Delivery Label Generator
                </Typography>
                
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Tabs value={activeTab} onChange={handleTabChange} centered sx={{ mb: 3 }}>
                    <Tab label="Order Form" />
                    <Tab label="Label Preview" />
                </Tabs>

                {activeTab === 0 ? (
                    <Box component="form" sx={{ mt: 2 }}>
                        <Typography variant="h6" gutterBottom>Sender Information</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Sender Name"
                                    name="senderName"
                                    value={form.senderName}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Sender Address"
                                    name="senderAddress"
                                    value={form.senderAddress}
                                    onChange={handleChange}
                                    required
                                    multiline
                                    rows={2}
                                    disabled={loading}
                                />
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 3 }} />

                        <Typography variant="h6" gutterBottom>Receiver Information</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Receiver Name"
                                    name="receiverName"
                                    value={form.receiverName}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Receiver Address"
                                    name="receiverAddress"
                                    value={form.receiverAddress}
                                    onChange={handleChange}
                                    required
                                    multiline
                                    rows={2}
                                    disabled={loading}
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                disabled={loading || !form.senderName || !form.senderAddress || !form.receiverName || !form.receiverAddress}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Generate Label'}
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{ mt: 2 }}>
                        {labelData && (
                            <>
                                <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                                    <Typography variant="h6" gutterBottom>Delivery Label Preview</Typography>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Delivery ID: {labelData.deliveryId}
                                    </Typography>
                                    <Box sx={{ my: 2 }}>
                                        <Barcode value={labelData.deliveryId} />
                                    </Box>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle2">From:</Typography>
                                            <Typography>{labelData.senderName}</Typography>
                                            <Typography>{labelData.senderAddress}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle2">To:</Typography>
                                            <Typography>{labelData.receiverName}</Typography>
                                            <Typography>{labelData.receiverAddress}</Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                                    <Button 
                                        variant="contained" 
                                        onClick={handleDownload}
                                        disabled={loading}
                                    >
                                        {loading ? <CircularProgress size={24} /> : 'Download PDF'}
                                    </Button>
                                    <Button 
                                        variant="outlined" 
                                        onClick={() => setActiveTab(0)}
                                        disabled={loading}
                                    >
                                        Back to Form
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default Dashboard;
