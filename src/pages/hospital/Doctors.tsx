import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Doctor, User } from '../../types/database';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Skeleton } from '../../components/ui/skeleton';
import { Search, Plus, ShieldPlus } from 'lucide-react';

// We join doctors with users table to get the name
type DoctorWithUser = Doctor & { user: User };

export default function HospitalDoctors() {
  const [doctors, setDoctors] = useState<DoctorWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    // Since we don't know the hospital ID for the current hospital admin yet,
    // we'll fetch all doctors. In a real app, filter by `hospital_id`
    const { data, error } = await supabase
      .from('doctors')
      .select(`
        *,
        user:profiles(*)
      `);

    if (!error && data) {
      setDoctors(data as any);
    }
    setLoading(false);
  };

  const filteredDoctors = doctors.filter(d => 
    (d.user?.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Hospital Doctors</h1>
          <p className="text-slate-500">Manage medical staff and their specializations.</p>
        </div>
        <Button className="bg-cyan-600 hover:bg-cyan-700">
          <Plus className="mr-2 h-4 w-4" /> Add New Doctor
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle>Medical Staff</CardTitle>
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search by name or specialization..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="py-12 text-center text-slate-500 flex flex-col items-center">
              <ShieldPlus className="h-12 w-12 text-slate-300 mb-3" />
              <p>No doctors found matching your search.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>License Number</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDoctors.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.user?.full_name || 'N/A'}</TableCell>
                    <TableCell>{doc.specialization}</TableCell>
                    <TableCell>{doc.license_no}</TableCell>
                    <TableCell>{doc.experience || 'Not specified'}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">Remove</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
