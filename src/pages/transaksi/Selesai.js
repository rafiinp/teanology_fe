import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Selesai = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [completeTransactions, setCompleteTransactions] = useState(null);
    const [detailTransactions, setDetailTransactions] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchCompleteTransactions = async () => {
            try {
                const response = await axios.get(`https://teanologyweb.tifpsdku.com/admin/transaction/complete`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                console.log(response.data);
                setCompleteTransactions(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchDetailTransactions = async () => {
            try {
                const response = await axios.get(`https://teanologyweb.tifpsdku.com/admin/transaction/detail`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                console.log(response.data);
                setDetailTransactions(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCompleteTransactions();
        fetchDetailTransactions();
    }, []);

    const handleDetail = (transaction) => {
        setSelectedTransaction(transaction);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTransaction(null);
    };

    return (
        <div className="container mx-auto">
            <h2 className=" text-center text-4xl font-semibold mt-5 mb-5 gap-4">History</h2>
            <h3 className="text-center text-2xl font-semibold mb-10">Order History List</h3>

            {/* Complete Transactions */}
            {completeTransactions && Array.isArray(completeTransactions) && completeTransactions.length > 0 ? (
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Completed Transactions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {completeTransactions.map((item, index) => (
                            <div key={index} className="pesanan-card bg-white shadow-md rounded-lg p-4">
                                <h3 className="text-lg font-bold mb-2">Order Id: {item.midtrans.order_id}</h3>
                                <div className="mb-2">
                                    <p className="text-gray-600">Metode Pembayaran: {item.midtrans.payment_type === 'bank_transfer' ? 'Transfer Bank' : item.midtrans.payment_type}</p>
                                    <p className="text-gray-600">Status: {item.midtrans.transaction_status === 'settlement' ? 'Paid' : item.midtrans.transaction_status}</p>
                                    <p className="text-gray-600">Pembayaran Dilakukan Pada: {item.midtrans.settlement_time}</p>
                                </div>
                                <button
                                    className="mt-2 bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 transition-colors duration-300"
                                    onClick={() => handleDetail(item)}
                                >
                                    See Detail
                                </button>
                            </div>
                        ))}
                    </div>
                    <div> <p className="text-center mt-4 mb-4">Wait, the admin will contact you after you make a payment :)</p></div>
                </div>
            ) : (
                <p className="text-center text-gray-500">There are no completed transactions.</p>
            )}

            {/* Modal */}
            {isModalOpen && selectedTransaction && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-auto overflow-y-auto outline-none focus:outline-none">
                    <div className="relative w-auto max-w-3xl mx-auto my-6">
                        {/* Modal content */}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/* Header */}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                <h3 className="text-2xl font-semibold">
                                    Payment Confirmation
                                </h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={closeModal}
                                >
                                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                    </span>
                                </button>
                            </div>
                            {/* Body */}
                            <div className="relative p-6 flex-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Order ID</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{selectedTransaction.midtrans.order_id}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Metode Pembayaran</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{selectedTransaction.midtrans.payment_type === 'bank_transfer' ? 'Transfer Bank' : selectedTransaction.midtrans.payment_type}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Status</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{selectedTransaction.midtrans.transaction_status === 'settlement' ? 'Paid' : selectedTransaction.midtrans.transaction_status}</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Total</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rp. {selectedTransaction.midtrans.gross_amount}</td>
                                        </tr>
                                        {/* Product Information */}
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Product</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {/* Check if selectedTransaction has detailTransactions */}
                                                {detailTransactions && detailTransactions[selectedTransaction.id_transaction] ? (
                                                    detailTransactions[selectedTransaction.id_transaction].map((detail, index) => (
                                                        <div key={index} className="mb-2">
                                                            <p><strong>Product Name:</strong> {detail.product_name}</p>
                                                            <p><strong>Quantity:</strong> {detail.jumlah}</p>
                                                            {/* Add more details if needed */}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>No product details found.</p>
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* Footer */}
                            {/* <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Selesai;
