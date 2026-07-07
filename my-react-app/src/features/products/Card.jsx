function Card(props) {
    const { name, price, categoryName } = props;
    return (
        <div className="card text-center shadow-lg">
            <div style={{
                width: '100%',
                height: '120px',
                backgroundColor: '#e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#888',
            }}>
                Image
            </div>
            <div className="card-body">
                <p style={{ margin: '4px 0', fontSize: '12px', color: '#666' }}>{categoryName}</p>
                <h2 className="card-title">{name}</h2>
                <p className="card-text">Price: ${price}</p>
            </div>
        </div>
    );
}
export default Card;