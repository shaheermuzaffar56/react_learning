function Card(props) {
    const { name, price } = props;
    return (
        <div className="card text-center shadow-lg">
           <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <p className="card-text">Price: ${price}</p>
            </div>
        </div>
    );
}

export default Card;