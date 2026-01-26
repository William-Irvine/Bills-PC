//import React from "react";
import PropTypes from "prop-types";

export default function DesktopButton({
    name,
    label,
    icon,
    active,
    onDoubleClick,
    position,
}: any) {
    console.log('DesktopButton:', name, 'position:', position);
    return (
        <div
            key={name}
            className="desktopButton"
            style={position ? {
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
            } : {}}
        >
            <button
                data-name={name}
                className={`desktopButton__button${name === active ? " -focused" : ""}`}
                onDoubleClick={onDoubleClick}
            >
                <img
                    src={icon}
                    className="desktopButton__image"
                    alt="icon"
                    width="50"
                />
                <p className="desktopButton__name">{label}</p>
            </button>
        </div>
    );
}

DesktopButton.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    active: PropTypes.string.isRequired,
    onDoubleClick: PropTypes.func.isRequired,
    position: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
    }),
};