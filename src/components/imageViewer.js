import React, { Component } from 'react'
import Lightbox from 'react-images-extended';
import ImageGrid from './imageGrid';
import _ from 'lodash';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export class imageViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageIndex: 0,
            lightboxIsOpen: true
        }
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.getImageIndex = this.getImageIndex.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
    }
    getImageIndex = (index) => {
        return this.state.imageIndex + index;
    }

    gotoPrevious() {
        if (this.state.imageIndex > 0) {
            this.setState({
                imageIndex: this.getImageIndex(-1)
            })
        }
    }

    gotoNext() {
        this.setState({
            imageIndex: this.getImageIndex(1)
        })
        //..body here
    }

    closeLightbox() {
        console.log('close')
        //..body here
        this.setState({
            lightboxIsOpen: false
        })

    }

    deleteImage() {
        const imageIndex = this.props.imageIndex;
        let storedImages = [];
        storedImages = JSON.parse(localStorage.getItem('images'));
        if (storedImages) {
            localStorage.removeItem('images');

            _.remove(storedImages, function (val, key) {
                return key === imageIndex;
            });

            const stringifyResult = JSON.stringify(storedImages);
            localStorage.setItem('images', stringifyResult);
        }
        this.closeLightbox();
    }

    render() {
        // view image grid
        if (!this.state.lightboxIsOpen) {
            return (<ImageGrid />)

        } else {
            // view image 
            return (

                <Lightbox
                    images={this.props.images}
                    backdropClosesModal={true}
                    currentImage={this.state.imageIndex}
                    isOpen={this.state.lightboxIsOpen}
                    onClickPrev={this.gotoPrevious}
                    onClickNext={this.gotoNext}
                    onClose={this.closeLightbox}
                    rotatable={true}
                    zoomable={true}
                    preloadNextImage={true}
                    customControls={[
                        
                        <button class="delete-button" key="deleteImage"  onClick={this.deleteImage}>
                        <FontAwesomeIcon size={"4x"} icon={faTrash} />
                        </button>
                    ]}
                    //onSave={(currentImageIndex, params) => console.log('currentImageIndex, currentImageSrc, params : ', currentImageIndex, this.props.images[currentImageIndex].src, params)}
                />
            );
        }
    }
}

export default imageViewer
