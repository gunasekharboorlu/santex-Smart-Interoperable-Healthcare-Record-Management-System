import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { AccessRequest, Patient, User } from '../../types/database';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import { Bell } from 'lucide-react';
import { format } from 'date-fns';

type RequestWithPatient = AccessRequest & {
  patient: Patient & { user: User };
};

export default function DoctorRequests() {
  const [requests, setRequests] = useState<RequestWithPatient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    // In real app, filter by this doctor's ID
    const { data, error } = await supabase
      .from('access_requests')
      .select(`
        *,
        patient:patients(user:profiles(*))
      `)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setRequests(data as any);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Access Requests</h1>
          <p className="text-slate-500">Track the status of your requests for patient medical records.</p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Sent Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : requests.length === 0 ? (
            <div className="py-12 text-center text-slate-500 flex flex-col items-center">
              <Bell className="h-12 w-12 text-slate-300 mb-3" />
              <p>You haven't sent any access requests yet.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Requested On</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Report ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="font-medium">{format(new Date(req.created_at), 'PPP')}</TableCell>
                    <TableCell>{req.patient?.user?.full_name || 'Unknown'}</TableCell>
                    <TableCell className="text-slate-500">{req.report_id || 'Full History'}</TableCell>
                    <TableCell>
                      <Badge variant={req.status === 'approved' ? 'success' : req.status === 'pending' ? 'warning' : 'destructive'}>
                        {req.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {req.status === 'approved' ? (
                        <button className="text-sm text-cyan-600 font-medium hover:underline">View Records</button>
                      ) : (
                        <span className="text-sm text-slate-400">Awaiting...</span>
                      )}
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
