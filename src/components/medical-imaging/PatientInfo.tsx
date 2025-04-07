export const PatientInfo = () => {
    return (
        <div className="border-brder border-b">
            <h2 className="font-semibold uppercase">patient info:</h2>
            <ul className="list-none text-sm">
                <li className="flex items-center justify-between">
                    <span className="font-semibold">Name:</span> Jonh Doe
                </li>
                <li className="flex items-center justify-between">
                    <span className="font-semibold">ID:</span> PID-12345
                </li>
                <li className="flex items-center justify-between">
                    <span className="font-semibold">DOB:</span> 01/15/1965
                </li>
                <li className="flex items-center justify-between">
                    <span className="font-semibold">Scan Date:</span> 04/05/2025
                </li>
            </ul>
        </div>
    );
};
