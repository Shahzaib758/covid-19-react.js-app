

export const InfoBox = ({ title, cases, total }) => {
    return (
        <div className='info-card'>
            <h2 className='info-title'>{title}</h2>
            <h2 className='info-cases'>+{cases}</h2>
            <h3 className='info-total' style={{ color: 'yellowGreen' }}>{total} Total</h3>
        </div>
    );
}