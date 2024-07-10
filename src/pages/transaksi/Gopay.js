import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


const Gopay = ({ imageUrl }) => {

    return (
<div className="container mt-3">
    <h2 className="text-2xl font-semibold mt-8">Payment by QRIS</h2>
    <div className="flex flex-col items-center mb-10">
        <h3 className="text-center mb-2">Please Scan the Image Below</h3>
        <p className="text-center">This QRIS can only be accessed one time</p>
    </div>
</div>

    );
};

export default Gopay;
