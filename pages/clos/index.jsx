import { useState, useEffect } from 'react';

import { Link } from '../../components/Link';
import { Spinner } from '../../components/Spinner';
import { Layout } from '../../components/clo/Layout';
import { cloService } from '../../services';

export default Index;

function Index() {
    const [clos, setClos] = useState(null);

    useEffect(() => {
        cloService.getAll().then(x => setClos(x));
    }, []);

    function deleteClo(id) {
        setClos(clos.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        cloService.delete(id).then(() => {
            setClos(clos => clos.filter(x => x.id !== id));
        });
    }

    return (
        <Layout>
            <h1>clos</h1>
            <Link href="/clos/add" className="btn btn-sm btn-success mb-2">Add clo</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>First Name</th>
                        <th style={{ width: '30%' }}>Last Name</th>
                        <th style={{ width: '30%' }}>Username</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {clos && clos.map(clo =>
                        <tr key={clo.id}>
                            <td>{clo.firstName}</td>
                            <td>{clo.lastName}</td>
                            <td>{clo.username}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/clos/edit/${clo.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteClo(clo.id)} className="btn btn-sm btn-danger btn-delete-clo" disabled={clo.isDeleting}>
                                    {clo.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!clos &&
                        <tr>
                            <td colSpan="4">
                                <Spinner />
                            </td>
                        </tr>
                    }
                    {clos && !clos.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No clos To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </Layout>
    );
}