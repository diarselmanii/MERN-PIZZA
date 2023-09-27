import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-light text-center text-lg-start">
            <div className="container p-4">
                <div className="row">
                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase">115's Pizza</h5>

                        <p>
                            115 order application for ordering Pizza since 2020.
                        </p>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        

                        <ul className="list-unstyled mb-0">
                            <li>
                                <a href="/" className="text-dark">
                                    Our Menu
                                </a>
                            </li>
                            <li>
                                <a href="/orders" className="text-dark">
                                    Orders
                                </a>
                            </li>
                            <li>
                                <a href="/cart" className="text-dark">
                                    Cart
                                </a>
                            </li>
                            
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        

                        <ul className="list-unstyled">
                            <li>
                                <a href="/register" className="text-dark">
                                    Create New Account
                                </a>
                            </li>
                            <li>
                                <a href="/login" className="text-dark">
                                    Login
                                </a>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>

            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © {new Date().getFullYear()} 115's Pizza
            </div>
        </footer>
    );
}