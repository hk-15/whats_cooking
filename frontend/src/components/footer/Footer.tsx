import "./Footer.scss";

export default function Footer() {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <div className="footer">
            <p>What&#8217;s Cooking &copy; {year}</p>
        </div>
    )
}