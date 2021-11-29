import React from "react";


class MainContainer extends React.Component {
    constructor(props){
        super(props);
        this.state={};
        
        this.onFileLoad = this.onFileLoad.bind(this);
    }
    componentDidMount() {

        fetch('http://localhost:3000/static/sampleImage.png',{
            mode: 'cors'
        }).then(image => {
            this.setState({image: image.url});
        })
    }
    onFileLoad(e) {
        const fileTypes ={
            'image/jpeg' : true,
            'image/png' : true
        }
        const file = e.currentTarget.files[0];
        // console.log(file.type)
        if (!file) return;
        else if(fileTypes[file.type]) {
            this.setState({image:URL.createObjectURL(file)});
            fetch('http://localhost:3000/uploadImage',{
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': file.type
                },
                body: file
            }).then(res => console.log(res))
        }
        


    }
    
    render() {
            return (
                <div className="position-absolute top-50 start-50 translate-middle">
                    <div className='container text-center'>
                        <div className="card" style={{
                                    width: '35rem',
                                     height: '37rem',
                                }}>
                            <div className="card-body">
                                <h5 className="card-title m-3">Upload Your Image</h5>
                                <p className="card-text m-3">File should be Jpeg, Png,... </p>
        
                                <div className="card text-dark bg-light mb-3 mx-auto" style={{
                                    width: '27.5rem',
                                    height: '20rem',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>
                                    <div className="text-center">
                                        <img src={this.state.image} className="rounded" alt="Sample" style={{
                                            maxWidth: '25rem'
                                        }} />
                                        {/* <p className='m-5 mb-4'>Drag & Drop your image here</p> */}
                                    </div>
                                </div>
        
                                {/* <button type="button" className="btn btn-primary m-3">Choose a file</button> */}
                                <div className="input-group mb-3">
                                    <input type="file" className="form-control" id="inputGroupFile02" onChange={this.onFileLoad}/>
                                    <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        
            )

    }
    
    
}

export default MainContainer;