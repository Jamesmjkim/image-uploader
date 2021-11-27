import React, { useEffect, useState } from "react";


const MainContainer = () => {
    const mainStyles = {
        width: '35rem',
        height: '37rem',
    }
    const subStyle = {
        width: '27.5rem',
        height: '20rem',
        display: 'flex',
        justifyContent: 'center'
    }
    const [mountain, setMountain] = useState('')
    useEffect(() => {
        // let mountain;
        fetch('/static/sampleImage.svg').then(image => {
            setMountain(image.url);
            // console.log(image.url)
        })

    },[])

    console.log(mountain)

    return (
        <div className="position-absolute top-50 start-50 translate-middle">
            <div className='container text-center'>
                <div className="card" style={mainStyles}>
                    <div className="card-body">
                        <h5 className="card-title m-3">Upload Your Image</h5>
                        <p className="card-text m-3">File should be Jpeg, Png,... </p>

                        <div className="card text-dark bg-light mb-3 mx-auto" style={subStyle}>
                            <div className="text-center">
                                <img src={mountain} className="rounded" alt="Sample" />
                            </div>
                        </div>

                        <p className="card-text m-3">Or</p>
                        <button type="button" className="btn btn-primary m-3">Choose a file</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MainContainer;