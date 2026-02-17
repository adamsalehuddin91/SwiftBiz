import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, suppliers, filters }) {
    // Robust defensive check for the entire object
    if (!suppliers) {
        return (
            <AuthenticatedLayout user={auth.user}>
                <div className="p-12 text-center text-gray-500">
                    Loading Suppliers... (Data object is missing)
                </div>
            </AuthenticatedLayout>
        );
    }

    // Defensive extraction of data
    const supplierList = Array.isArray(suppliers.data) ? suppliers.data : [];
    const metaLinks = Array.isArray(suppliers.links) ? suppliers.links : [];

    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('suppliers.index'), { search }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Suppliers</h2>}
        >
            <Head title="Suppliers" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <form onSubmit={handleSearch} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search suppliers..."
                                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                                    >
                                        Search
                                    </button>
                                </form>
                                <Link
                                    href={route('suppliers.create')}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
                                >
                                    Add New Supplier
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {supplierList.length > 0 ? (
                                            supplierList.map((supplier) => (
                                                <tr key={supplier.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {supplier.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {supplier.company_name || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <div>{supplier.email}</div>
                                                        <div>{supplier.phone}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <Link
                                                            href={route('suppliers.edit', supplier.id)}
                                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                        >
                                                            Edit
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                                    No suppliers found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {metaLinks.length > 0 && (
                                <div className="mt-4">
                                    <div className="flex justify-center flex-wrap gap-2">
                                        {metaLinks.map((link, i) => (
                                            <Link
                                                key={i}
                                                href={link.url || '#'}
                                                className={`px-3 py-1 border rounded text-sm ${link.active ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'} ${!link.url ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                onClick={(e) => !link.url && e.preventDefault()}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
