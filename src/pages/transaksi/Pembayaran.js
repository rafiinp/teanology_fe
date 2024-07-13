import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Pembayaran = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); // Menyimpan item yang dipilih untuk bayar

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`https://teanologyweb.tifpsdku.com/admin/transaction/not-complete`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                console.log(response.data)
                setData(response.data);
            } catch (error) {
                console.error("Failed to fetch cart items:", error);
            }
        };
        fetchCartItems();
    }, []);

    const handleBayarClick = (item) => {
        setSelectedItem(item); // Menetapkan item yang dipilih untuk bayar
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedItem(null); // Me-reset item yang dipilih
    };

    const handleBayar = () => {
        // Implementasi logika pembayaran
        console.log("Pembayaran berhasil untuk item:", selectedItem);
        handleCloseModal(); // Menutup modal setelah pembayaran berhasil
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-4">
            <h2 className="text-center text-4xl font-semibold mb-5 mt-5 gap-4">Payment</h2>
            <h3 className="text-2xl font-semibold text-center mb-5">Unpaid Order List</h3>
            {data && Array.isArray(data) && data.length > 0 ? (
                <div className="flex flex-wrap">
                    {data.map((item, index) => (
                        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                            <div className="pesanan-card p-5 border rounded">
                                <h3 className="font-semibold">Order ID: {item.midtrans.order_id}</h3>
                                <div className="mb-4"></div>
                                <p>
                                    Payment Method:{' '}
                                    {item.midtrans.payment_type === 'gopay'
                                        ? 'Gopay'
                                        : item.midtrans.payment_type === 'bank_transfer'
                                            ? 'Transfer Bank'
                                            : item.midtrans.payment_type}
                                </p>
                                <p>
                                    Status:{' '}
                                    {item.midtrans.transaction_status === 'pending'
                                        ? 'Unpaid'
                                        : item.midtrans.transaction_status}
                                </p>
                                <p>Make The Payment Before: {item.midtrans.expiry_time}</p>
                                <div className="mb-4"></div>
                                <button
                                    onClick={() => handleBayarClick(item)}
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Pay
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>There are no unpaid orders.</p>
            )}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
                    <div className="bg-white p-8 rounded-lg w-full sm:max-w-md">
                        <button
                            className="absolute top-2 right-2 text-black"
                            onClick={() => handleCloseModal()}
                        >
                            &times;
                        </button>
                        <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                            <h3 className="text-2xl font-semibold">
                                Payment Confirmation
                            </h3>
                        </div>
                        <div className="border-b-2 border-gray-400 mb-4"></div> {/* Kotak pembatas */}
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detail</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Information</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Order ID</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{selectedItem.midtrans.order_id}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Metode Pembayaran</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{selectedItem.midtrans.payment_type}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Status</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{selectedItem.midtrans.transaction_status}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Bank</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{selectedItem.midtrans.va_numbers[0].bank}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No rekening</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{selectedItem.midtrans.va_numbers[0].va_number}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Total</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rp. {selectedItem.midtrans.gross_amount}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={handleBayar}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Confirm Payment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pembayaran;
