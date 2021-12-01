import React from "react";


class MainContainer extends React.Component {
    constructor(props){
        super(props);
        this.state={
            fileUploaded:false
        };
        
        this.onFileLoad = this.onFileLoad.bind(this);
    }
    componentDidMount() {

        fetch('http://localhost:3000/static/sampleImage.png',{
            // mode: 'cors'
        }).then(image => {
            this.setState({image: image.url});
        })
    }
    onFileLoad(e) {
        const fileTypes ={
            'image/jpeg' : true,
            'image/png' : true
        }
        const file = e.target.files[0];
        const data = new FormData();
        data.append('file', file);
        if (!file) {
            this.setState({image:'Error'})
        }
        else if(fileTypes[file.type]) {
            fetch('http://localhost:3000/upload',{
                method: 'POST',
                mode: 'cors',
                body: data
            })
            .then(res => res.json())
            .then(res => {
                console.log(res.filePath);
                this.setState({image:res.filePath,fileUploaded:true})
            })
        }
        


    }
    
    render() {
        const { image, fileUploaded } = this.state;
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
                                        {image === 'Error' ? <p>Error with Uploading Image</p> : 
                                        <div>
                                            <img src={image} className="rounded" alt="Sample" style={{
                                                maxWidth: '25rem'
                                            }} />
                                            {fileUploaded ? 
                                            <p className='text-center m-2' style ={{color: 'blue'}}>Upload Successful!!</p> : null
                                            }
                                        </div>
                                        }
                                    </div>
                                </div>
        
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