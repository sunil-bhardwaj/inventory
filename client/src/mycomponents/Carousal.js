import React from 'react'

export default function Carousal() {
	return (

		<div className="container mt-5 mb-5">
    <div className="row g-1">
        <div className="col-md-4">
            <div className="p-card">
                <div className="p-carousel">
                    <div className="carousel slide" data-ride="carousel" id="carousel-1">
                        <div className="carousel-inner" role="listbox">
                            <div className="carousel-item active">
                            <img className="w-100 d-block" src="https://i.imgur.com/NwKcuYO.jpg" alt="Slide Image1"/></div>
                            <div className="carousel-item">
                            <img className="w-100 d-block" src="https://i.imgur.com/DDTs3zs.jpg" alt="Slide Image2"/></div>
                            <div className="carousel-item">
                            <img className="w-100 d-block" src="https://i.imgur.com/aFfL7MV.jpg" alt="Slide Image3"/></div>
                        </div>
                        <div><a className="carousel-control-prev" href="#carousel-1" role="button" data-slide="prev"><span className="carousel-control-prev-icon"></span><span className="sr-only">Previous</span></a><a className="carousel-control-next" href="#carousel-1" role="button" data-slide="next"><span className="carousel-control-next-icon"></span><span className="sr-only">Next</span></a></div>
                        <ol className="carousel-indicators">
                            <li data-target="#carousel-1" data-slide-to="0" className="active"></li>
                            <li data-target="#carousel-1" data-slide-to="1"></li>
                            <li data-target="#carousel-1" data-slide-to="2"></li>
                        </ol>
                    </div>
                </div>
                <div className="p-details">
                    <div className="d-flex justify-content-between align-items-center mx-2">
                        <h5>Dell XPS 360</h5><span>$1,200</span>
                    </div>
                    <div className="mx-2">
                        <hr className="line"/>
                    </div>
                    <div className="d-flex justify-content-between mt-2 spec mx-2">
                        <div className="d-flex flex-column align-items-center">
                            <h6 className="mb-0">RAM</h6><span>8GB</span>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <h6 className="mb-0">SSD</h6><span>256GB</span>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <h6 className="mb-0">CPU</h6><span>1.5 GHZ</span>
                        </div>
                    </div>
                     </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="p-card">
                <div className="p-carousel">
                    <div className="carousel slide" data-ride="carousel" id="carousel-2">
                        <div className="carousel-inner" role="listbox">
                            <div className="carousel-item active">
                            <img className="w-100 d-block" src=" https://i.imgur.com/O1cHssd.jpg" alt="Slide Image4"/></div>
                            <div className="carousel-item">
                            <img className="w-100 d-block" src="https://i.imgur.com/nayZQY8.jpg" alt="Slide Image5"/></div>
                            <div className="carousel-item">
                            <img className="w-100 d-block" src="https://i.imgur.com/slrsTdn.jpg" alt="Slide Image6"/></div>
                        </div>
                        <div><a className="carousel-control-prev" href="#carousel-2" role="button" data-slide="prev"><span className="carousel-control-prev-icon"></span><span className="sr-only">Previous</span></a><a className="carousel-control-next" href="#carousel-2" role="button" data-slide="next"><span className="carousel-control-next-icon"></span><span className="sr-only">Next</span></a></div>
                        <ol className="carousel-indicators">
                            <li data-target="#carousel-2" data-slide-to="0" className="active"></li>
                            <li data-target="#carousel-2" data-slide-to="1"></li>
                            <li data-target="#carousel-2" data-slide-to="2"></li>
                        </ol>
                    </div>
                </div>
                <div className="p-details">
                    <div className="d-flex justify-content-between align-items-center mx-2">
                        <h5>Macbook Air</h5><span>$2,200</span>
                    </div>
                    <div className="mx-2">
                        <hr className="line"/>
                    </div>
                    <div className="d-flex justify-content-between mt-2 spec mx-2">
                        <div className="d-flex flex-column align-items-center">
                            <h6 className="mb-0">RAM</h6><span>8GB</span>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <h6 className="mb-0">SSD</h6><span>256GB</span>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <h6 className="mb-0">CPU</h6><span>2.5 GHZ</span>
                        </div>
                    </div>
                    </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="p-card">
                <div className="p-carousel">
                    <div className="carousel slide" data-ride="carousel" id="carousel-3">
                        <div className="carousel-inner" role="listbox">
                            <div className="carousel-item active">
                            <img className="w-100 d-block" src="https://i.imgur.com/8U19jmz.jpg" alt="Slide Image7"/></div>
                            <div className="carousel-item">
                            <img className="w-100 d-block" src="https://i.imgur.com/3IC1rnk.jpg" alt="Slide Image8"/></div>
                            <div className="carousel-item">
                            <img className="w-100 d-block" src="https://i.imgur.com/yNlOlpO.jpg" alt="Slide Image9"/></div>
                        </div>
                        <div><a className="carousel-control-prev" href="#carousel-3" role="button" data-slide="prev"><span className="carousel-control-prev-icon"></span><span className="sr-only">Previous</span></a><a className="carousel-control-next" href="#carousel-3" role="button" data-slide="next"><span className="carousel-control-next-icon"></span><span className="sr-only">Next</span></a></div>
                        <ol className="carousel-indicators">
                            <li data-target="#carousel-3" data-slide-to="0" className="active"></li>
                            <li data-target="#carousel-3" data-slide-to="1"></li>
                            <li data-target="#carousel-3" data-slide-to="2"></li>
                        </ol>
                    </div>
                </div>
                <div className="p-details">
                    <div className="d-flex justify-content-between align-items-center mx-2">
                        <h5>Macbook Pro</h5><span>$3,200</span>
                    </div>
                    <div className="mx-2">
                        <hr className="line"/>
                    </div>
                    <div className="d-flex justify-content-between mt-2 spec mx-2">
                        <div className="d-flex flex-column align-items-center">
                            <h6 className="mb-0">RAM</h6><span>16GB</span>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <h6 className="mb-0">SSD</h6><span>512GB</span>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <h6 className="mb-0">CPU</h6><span>4.5 GHZ</span>
                        </div>
                    </div>
                    </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="p-card">
                <div className="p-carousel">
                    <div className="carousel slide" data-ride="carousel" id="carousel-4">
                        <div className="carousel-inner" role="listbox">
                            <div className="carousel-item active">
                            <img className="w-100 d-block" src="https://i.imgur.com/8U19jmz.jpg" alt="Slide Image11"/></div>
                            <div className="carousel-item">
                            <img className="w-100 d-block" src="https://i.imgur.com/3IC1rnk.jpg" alt="Slide Image22"/></div>
                            <div className="carousel-item">
                            <img className="w-100 d-block" src="https://i.imgur.com/yNlOlpO.jpg" alt="Slide Image33"/></div>
                        </div>
                        <div><a className="carousel-control-prev" href="#carousel-4" role="button" data-slide="prev"><span className="carousel-control-prev-icon"></span><span className="sr-only">Previous</span></a><a className="carousel-control-next" href="#carousel-4" role="button" data-slide="next"><span className="carousel-control-next-icon"></span><span className="sr-only">Next</span></a></div>
                        <ol className="carousel-indicators">
                            <li data-target="#carousel-4" data-slide-to="0" className="active"></li>
                            <li data-target="#carousel-4" data-slide-to="1"></li>
                            <li data-target="#carousel-4" data-slide-to="2"></li>
                        </ol>
                    </div>
                </div>
                <div className="p-details">
                    <div className="d-flex justify-content-between align-items-center mx-2">
                        <h5>Macbook Pro</h5><span>$3,200</span>
                    </div>
                    <div className="mx-2">
                        <hr className="line"/>
                    </div>
                    <div className="d-flex justify-content-between mt-2 spec mx-2">
                        <div className="d-flex flex-column align-items-center">
                            <h6 className="mb-0">RAM</h6><span>16GB</span>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <h6 className="mb-0">SSD</h6><span>512GB</span>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <h6 className="mb-0">CPU</h6><span>4.5 GHZ</span>
                        </div>
                    </div>
                    </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="p-card">
                <div className="p-carousel">
                    <div className="carousel slide" data-ride="carousel" id="carousel-5">
                        <div className="carousel-inner" role="listbox">
                            <div className="carousel-item active">
                            <img className="w-100 d-block" src="https://i.imgur.com/NwKcuYO.jpg" alt="Slide Image44"/></div>
                            <div className="carousel-item">
                            <img className="w-100 d-block" src="https://i.imgur.com/DDTs3zs.jpg" alt="Slide Image55"/></div>
                            <div className="carousel-item">
                            <img className="w-100 d-block" src="https://i.imgur.com/aFfL7MV.jpg" alt="Slide Image66"/></div>
                        </div>
                        <div><a className="carousel-control-prev" href="#carousel-5" role="button" data-slide="prev"><span className="carousel-control-prev-icon"></span><span className="sr-only">Previous</span></a><a className="carousel-control-next" href="#carousel-5" role="button" data-slide="next"><span className="carousel-control-next-icon"></span><span className="sr-only">Next</span></a></div>
                        <ol className="carousel-indicators">
                            <li data-target="#carousel-5" data-slide-to="0" className="active"></li>
                            <li data-target="#carousel-5" data-slide-to="1"></li>
                            <li data-target="#carousel-5" data-slide-to="2"></li>
                        </ol>
                    </div>
                </div>
                <div className="p-details">
                    <div className="d-flex justify-content-between align-items-center mx-2">
                        <h5>Dell XPS 360</h5><span>$1,200</span>
                    </div>
                    <div className="mx-2">
                        <hr className="line"/>
                    </div>
                    <div className="d-flex justify-content-between mt-2 spec mx-2">
                        <div className="d-flex flex-column align-items-center">
                            <h6 className="mb-0">RAM</h6><span>8GB</span>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <h6 className="mb-0">SSD</h6><span>256GB</span>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <h6 className="mb-0">CPU</h6><span>1.5 GHZ</span>
                        </div>
                    </div>
                     </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="p-card">
                <div className="p-carousel">
                    <div className="carousel slide" data-ride="carousel" id="carousel-6">
                        <div className="carousel-inner" role="listbox">
                            <div className="carousel-item active">
                            <img className="w-100 d-block" src="https://i.imgur.com/8U19jmz.jpg" alt="Slide Image77"/></div>
                            <div className="carousel-item">
                            <img className="w-100 d-block" src="https://i.imgur.com/3IC1rnk.jpg" alt="Slide Image88"/></div>
                            <div className="carousel-item">
                            <img className="w-100 d-block" src="https://i.imgur.com/yNlOlpO.jpg" alt="Slide Image99"/></div>
                        </div>
                        <div><a className="carousel-control-prev" href="#carousel-6" role="button" data-slide="prev"><span className="carousel-control-prev-icon"></span><span className="sr-only">Previous</span></a><a className="carousel-control-next" href="#carousel-6" role="button" data-slide="next"><span className="carousel-control-next-icon"></span><span className="sr-only">Next</span></a></div>
                        <ol className="carousel-indicators">
                            <li data-target="#carousel-6" data-slide-to="0" className="active"></li>
                            <li data-target="#carousel-6" data-slide-to="1"></li>
                            <li data-target="#carousel-6" data-slide-to="2"></li>
                        </ol>
                    </div>
                </div>
                <div className="p-details">
                    <div className="d-flex justify-content-between align-items-center mx-2">
                        <h5>Macbook Pro</h5><span>$3,200</span>
                    </div>
                    <div className="mx-2">
                        <hr className="line"/>
                    </div>
                    <div className="d-flex justify-content-between mt-2 spec mx-2">
                        <div className="d-flex flex-column align-items-center">
                            <h6 className="mb-0">RAM</h6><span>16GB</span>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <h6 className="mb-0">SSD</h6><span>512GB</span>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <h6 className="mb-0">CPU</h6><span>4.5 GHZ</span>
                        </div>
                    </div>
                    </div>
            </div>
        </div>
    </div>
</div>
	)
}