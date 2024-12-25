import { Container, Typography, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

const Orders = () => {
    const { authUser } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (authUser) {
            axios({
                url: 'https://uc-fd-auth-backend.onrender.com/user/orders',
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${authUser}`,
                }
            })
            .then(response => {
                setOrders(response.data.orders); 
                console.log('Orders retrieved:', response.data.orders); 
                setLoading(false); 
            }) 
            .catch(err => {
                console.log('Error retrieving orders:', err);
                setLoading(false); 
            });
        }
    }, [authUser]);

    return (
        <Container style={{ display: 'flex',flexDirection: 'column' ,justifyContent: 'center', alignContent: 'center'}}>
            <Typography variant="h4" style={{ display: 'flex',flex: 'row' ,margin: '20px' , width: '40vw', height: '50px', justifyContent: 'center', alignItems :'center'}}>Orders</Typography>
            {loading ? (
                <Typography variant="h6">Loading orders...</Typography> 
            ) : orders.length > 0 ? ( 
                orders.map(order => (
                    <Box key={order.id} style={{ display: 'flex',flex: 'row' ,margin: '20px' ,border: '1px solid #d3d3d3', width: '40vw', height: '50px', justifyContent: 'space-around', alignItems :'center'}}>
                        <Typography variant="h5" >{order.item}</Typography>
                        <Typography variant="h6">₹{order.price}</Typography>
                        <Typography variant="h6">{order.date}</Typography>
                    </Box>                ))
            ) : (
                <Typography variant="h6">No orders found.</Typography> 
            )}
        </Container>
    );
};

export default Orders;