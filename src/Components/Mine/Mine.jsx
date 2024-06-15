import React, { useState } from 'react';
import './Mine.css';
import useSound from 'use-sound';
import dimondO from '../../assets/dimondO.mp3';
import bombO from '../../assets/bombO.mp3';
import click from '../../assets/click.mp3';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from 'axios';

const generateGrid = (totalmine) => {
    const grid = Array.from({ length: 5 }, () => Array(5).fill('C'));
    const positions = new Set();

    while (positions.size < totalmine) {
        const mr = Math.floor(Math.random() * 5);
        const mc = Math.floor(Math.random() * 5);
        positions.add(`${mr},${mc}`);
    }

    positions.forEach(pos => {
        const [row, col] = pos.split(',').map(Number);
        grid[row][col] = 'M';
    });
    return grid;
};

const Mine = () => {
    const { User_id } = useSelector(state => state.gambledeatil);
    const [betamount, Setbetamount] = useState(0);
    const [oneMineprice, SetoneMineprice] = useState();
    const [woncount, Setwoncount] = useState(0);
    const [gameStart, SetgameStart] = useState(false);
    const [totalmine, Settotalmine] = useState(1);
    const [playdimond] = useSound(dimondO);
    const [playbomb] = useSound(bombO);
    const [playClick] = useSound(click);
    const [grid, setGrid] = useState(generateGrid(0));
    const [ProfitShow, SetProfitShow] = useState(0);

    const minuswallet = async () => {
        try {
            const { data } = await axios.post("https://rangbazi-backend.onrender.com/minusmoney", {
                id: User_id,
                value: betamount
            });
            if (data.success === false) {
                SetgameStart(false);
                toast.warn(data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                let nonClickElements = document.querySelectorAll('.nonclick');
                nonClickElements.forEach(element => {
                    element.style.position = "relative";
                    element.style.zIndex = "9";
                });
            } else {
                SetgameStart(true);
                toast.success("Bet Placed Successfully", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const addwallet = async (winprize) => {
        try {
            await axios.post("https://rangbazi-backend.onrender.com/addmoney", {
                id: User_id,
                value: winprize
            });
        } catch (error) {
            console.log(error);
        }
    }

    const revealAllBoxes = (updatedGrid) => {
        const newGrid = updatedGrid.map(row => row.map(cell => (cell === 'M') ? 'B' : (cell === 'C') ? 'D' : cell));
        setGrid(newGrid);
        let revealedElements = document.querySelectorAll('.M, .C');
            revealedElements.forEach(element => {
                element.style.opacity = "0.2";
            });
    }

    const reset = (updatedGrid) => {
        revealAllBoxes(updatedGrid);
        toast.error("You lose", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        let nonClickElements = document.querySelectorAll('.nonclick');
        let mineBox = document.querySelectorAll('.Row');
        nonClickElements.forEach(element => {
            element.style.position = "relative";
            element.style.zIndex = "9";
        });
        mineBox.forEach(element => {
            element.style.zIndex = "-9";
        });
        SetgameStart(false);
        SetProfitShow(0);
    }

    const clickHandler = (row, col) => {
        if (!gameStart) {
            toast.warn("Please place a bet", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            const newGrid = [...grid];
            newGrid[row] = [...newGrid[row]];

            if (grid[row][col] === 'M' || grid[row][col] === 'B') {
                playbomb();
                newGrid[row][col] = 'B';
                setGrid(newGrid);
                reset(newGrid);
            } else {
                playdimond();
                newGrid[row][col] = 'D';
                let count = woncount + 1;
                Setwoncount(count);
                let intoX = 1 + (oneMineprice * woncount);
                let x = (Math.round(intoX * 100) / 100).toFixed(2);
                SetProfitShow(x);
                setGrid(newGrid);
            }
        }
    };

    const PlaceBet = async () => {
        if (User_id === "") {
            toast.warn("Login First !!!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            playClick();
            let nonClickElements = document.querySelectorAll('.nonclick');
            let mineBox = document.querySelectorAll('.Row');
            nonClickElements.forEach(element => {
                element.style.position = "relative";
                element.style.zIndex = "-9";
            });
            mineBox.forEach(element => {
                element.style.zIndex = "9";
            });
            setGrid(generateGrid(totalmine));
            let revealedElements = document.querySelectorAll('.M, .B, .C, .D');
            revealedElements.forEach(element => {
                element.style.opacity = "1";
            });
            let prize = (0.04 * totalmine);
            SetoneMineprice(prize);
            minuswallet();
        }
    }

    const Cashout = () => {
        playClick();
        revealAllBoxes(grid);
        let nonClickElements = document.querySelectorAll('.nonclick');
        nonClickElements.forEach(element => {
            element.style.position = "relative";
            element.style.zIndex = "9";
        });
        SetgameStart(false);
        let intoX = 1 + (oneMineprice * woncount);
        let winamount = betamount * intoX;
        let x = winamount - 0;
        let x_round = (Math.round(x * 100) / 100).toFixed(1);
        toast.success(`💰${x_round} Cash-Out Successful`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        Setwoncount(0);
        SetProfitShow(0);
        addwallet(x);
    }

    return (
        <>
            <div className="mine-main">
                <div className="bet-box">
                    <div className='nonclick'>
                        <h2>Bet Amount ₹</h2>
                        <input type="number" value={betamount} onChange={(e) => {
                            Setbetamount(e.target.value);
                        }} className='Enter the bet amount' />
                    </div>
                    <div className='nonclick'>
                        <h2>Total Mines</h2>
                        <select onChange={(e) => { Settotalmine(e.target.value) }}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    {gameStart ? <button onClick={Cashout} >Cash Out</button> : <button onClick={PlaceBet} >Place Bet</button>}
                    <h4>Total profit ({ProfitShow}x)</h4>
                </div>
                <div className="mine-box">
                    {grid.map((row, indexR) => (
                        <div className="Row" key={indexR}>
                            {row.map((cell, indexC) => (
                                <div
                                    className={cell}
                                    key={indexC}
                                    onClick={() => clickHandler(indexR, indexC)}
                                ></div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        </>
    );
};

export default Mine;
