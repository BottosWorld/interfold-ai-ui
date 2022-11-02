import { AddEdit } from '../../components/clo/login';
import { Layout } from '../../components/clo/Layout';


export default Add;

function Add() {
    return (
        <Layout>
            <h1>Create Commercial Loan Officer</h1>
            <AddEdit />
        </Layout>
    );
}