import React, { Component } from 'react'
import Gallery from 'react-grid-gallery';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ImageViewer from './imageViewer'
import helper from '../helper'
import '../App.css'

export class imageGrid extends Component {

    fileObj = [];
    fileArray = [];
    images = [];
    base64Arr = []

    constructor(props) {
        super(props)

        this.state = {
            enlarge: false,
            updatedImages: [],
            file: [null],
            imageIndex: 0,
            savedImages: []
        }

        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
        this.uploadFiles = this.uploadFiles.bind(this)

        // displayed images from localstorage if exists
        //let storedFiles = [];
        let storedImages = [];
        storedImages = JSON.parse(localStorage.getItem('images'));
        if (storedImages) {
            this.reloadImage(storedImages);
        }
    }

    reloadImage(imageList) {
        imageList.map(async (base64String) => {
            const image = new Image();
            image.src = base64String;

            const imageObj = {
                "src": base64String,
                "thumbnail": base64String,
                "thumbnailWidth": 320,
                "thumbnailHeight": 174
            }
            this.base64Arr.push(base64String);
            this.setState({
                savedImages: [...this.state.savedImages, imageObj]
            })
            this.images.push(imageObj)
        });
        console.table(this.images)
    }
    componentDidMount() {
        console.log('component did mount')
        console.table(this.state.savedImages)
        this.setState({
            savedImages: [...this.images]
        })
    }

    componentWillMount() {
        console.log('component will mount')
    }

    onClickImage() {
        console.log('image clicked')
    }
    uploadFiles(e) {
        e.preventDefault()
        console.log(this.state.file)
    }
    callback() {
        console.log('file updated !')
    }
    uploadMultipleFiles(e) {
        this.fileObj.push(e.target.files)
        console.log(`length----${this.fileObj[0].length}`)
        for (let i = 0; i < this.fileObj[0].length; i++) {
            let file = this.fileObj[0][i]
            this.fileArray.push(URL.createObjectURL(file))

            helper.getBase64(file, (base64String) => {
                this.base64Arr.push(base64String);
                const stringifyResult = JSON.stringify(this.base64Arr);
                localStorage.setItem('images', stringifyResult);
                //this.images = this.state.savedImages;

                let imageObj = {
                    "src": base64String,
                    "thumbnail": base64String,
                    "thumbnailWidth": 320,
                    "thumbnailHeight": 174
                }
                //this.base64Arr.push(base64String);
                this.images.push(imageObj)

                // this.setState({
                //    savedImages: [...this.images]
                // })
            });
        }
        console.table(this.images)
        console.log('DONE !')
    }

    render() {
        const onClickThumbnail = (imageIndex) => {
            console.log('light box  clicked')
            let arr = []

            arr.push(this.images[imageIndex])
            this.setState({
                enlarge: true,
                updatedImages: arr,
                imageIndex: imageIndex
            })
        }

        if (this.state.enlarge) {
            return (
                <div>
                    <ImageViewer images={this.state.updatedImages} imageIndex={this.state.imageIndex} />
                </div>
            )
        } else {
            console.table(this.images)
            if (this.state.savedImages.length <= 0) {
                return (
                    <div>
                        <div>
                            <form>
                            <div className="form-group center">
                                <div>
                                    <input type="file" id="element1" className="form-control center" onChange={this.uploadMultipleFiles} multiple />

                                    <input type='button' id="element2" value='Upload' onClick={() => window.location.reload()} />
                                </div>
                            </div>
                            </form >
                        </div>
                        <div class='center'>
                            No Images found !
                        </div>
                    </div>
                )
            }
            return (
                <div>
                    <div>
                        <form>
                            <div className="form-group center">
                                <div>
                                    <input type="file" id="element1" className="form-control center" onChange={this.uploadMultipleFiles} multiple />

                                    <input type='button' id="element2" value='Upload' onClick={() => window.location.reload()} />
                                </div>
                            </div>

                        </form >
                    </div>
                    <div class='container'>
                        <Gallery images={this.state.savedImages}
                            onClickImage={this.onClickImage}
                            onClickThumbnail={(imageIndex) => onClickThumbnail(imageIndex)}
                        />
                    </div>
                </div>
            )
        }
    }
}

export default imageGrid
