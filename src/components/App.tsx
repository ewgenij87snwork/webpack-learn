import React, { useState } from 'react';
import classes from './App.module.scss';
import { Link, Outlet } from "react-router-dom";
import pngPng from '@/assets/png.png';
import jpgJpg from '@/assets/jpg.jpg';
import SvgSvg from '@/assets/svg.svg';



// function toDo (a: number) {
//     console.log(a)
// }

export const App = () => {
    const [count, setCount] = useState<number>(0);

    const increment = () => setCount(prev => prev + 1);

    // if(__PLATFORM__ === 'desktop') {
    //     return <div>ISDESKTOPPLATFORM</div>
    // }
    //
    // if(__PLATFORM__ === 'mobile') {
    //     return <div>ISMOBILEPLATFORM</div>
    // }

    // if(__ENV__=== 'development') {
    //     // addDevTools
    // }


    // toDo(4);

    return (
        <div data-testid={'App'}>
            <h1 data-testid={'Platform'}>PLATFORM={__PLATFORM__}</h1>
            <div>
                <img width={64} height={64} src={pngPng} alt=""/>
                <img width={64} height={64} src={jpgJpg} alt=""/>
            </div>
            <div>
                <SvgSvg width={50} height={50}  fill={'green'}/>
            </div>
            <Link to={'/about'}>about</Link>
            <br/>
            <Link to={'/shop'}>shop</Link>
            <h1 className={classes.value}>{count}</h1>
            <button className={classes.button} onClick={increment}><span>incr</span></button>
            <Outlet/>
        </div>
    )
}