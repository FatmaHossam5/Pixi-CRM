// File: TooltipIcon.jsx
export default function TooltipIcon({ iconClass, label, style,onClick }) {
    return (
      <div className="tooltip-wrapper position-relative d-flex align-items-center justify-content-center"onClick={onClick}>
        <i className={`fa-thin ${iconClass}`} style={style} />
  
        <div
          className="custom-tooltip position-absolute top-100 start-50 translate-middle-x px-2 py-1 bg-white text-dark small rounded opacity-0"
          style={{
            pointerEvents: 'none',
            zIndex: 10,
            whiteSpace: 'nowrap',
            transition: 'opacity 0.2s ease-in-out',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          {label}
        </div>
      </div>
    );
  }
  