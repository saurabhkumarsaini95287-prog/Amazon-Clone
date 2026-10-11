const LocationPopup = ({ close, getLocation, loading }) => {
    return (
        <div className="location-overlay">
            <div className="location-popup">
                <h2>Choose your location</h2>

                <p>
                    Get your current location to see products
                    available in your area.
                </p>

                <button
                    className="current-location-btn"
                    onClick={getLocation}
                    disabled={loading}
                >
                    <i className="fa-solid fa-location-crosshairs"></i>
                    {loading
                        ? "Getting location..."
                        : "Use my current location"}
                </button>

                <button
                    className="cancel-location"
                    onClick={close}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default LocationPopup;