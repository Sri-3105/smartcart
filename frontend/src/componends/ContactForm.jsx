import Contact from "../pages/Contact";

const ContactForm = ({ data }) => {
    return (
        <div className="container">
            <table className="contact-table">
                <thead>
                    <tr>    
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.message}</td>
                        </tr>
                        
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContactForm;