import {useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
// import { AppContext } from '../contexts/AppContext';


export default function LoginPage() {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
}