const PrimePopup = ({ close }) => {
    return (
        <div className="prime-popup">
            <div className="prime-box">
                <button onClick={close}>×</button>

                <h2>👑 Amazon Prime</h2>

                <audio controls>
                    <source
                        src="/prime%20mp3.mp3"
                        type="audio/mpeg"
                    />
                    Your browser does not support audio.
                </audio>
            </div>
        </div>
    );
};

export default PrimePopup;