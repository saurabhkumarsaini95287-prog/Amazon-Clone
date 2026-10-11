const VideoPopup = ({ close }) => {
    return (
        <div className="video-popup">
            <div className="video-box">
                <button
                    className="close-video"
                    onClick={close}
                >
                    ×
                </button>

                <h2>🎬 MX Player</h2>

                <video controls width="100%">
                    <source src="/video.mp4.mp4" type="video/mp4" />
                    Your browser does not support video.
                </video>
            </div>
        </div>
    );
};

export default VideoPopup;