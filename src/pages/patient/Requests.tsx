import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { AccessRequest, Doctor, User } from '../../types/database';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Skeleton } from '../../components/ui/skeleton';
import { Bell, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';

type RequestWithDoctor = AccessRequest & {
  doctor: Doctor & { user: User };
};

export default function PatientRequests() {
  const [requests, setRequests] = useState<RequestWithDoctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    // In real app, filter by this patient's ID
    const { data, error } = await supabase
      .from('access_requests')
      .select(`
        *,
        doctor:doctors(user:profiles(*))
      `)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setRequests(data as any);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('access_requests')
      .update({ status })
      .eq('id', id);
    
    if (!error) {
      setRequests(requests.map(r => r.id === id ? { ...r, status: status as any } : r));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Access Requests</h1>
          <p className="text-slate-500">Manage who has access to your medical history.</p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Pending & Past Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : requests.length === 0 ? (
            <div className="py-12 text-center text-slate-500 flex flex-col items-center">
              <Bell className="h-12 w-12 text-slate-300 mb-3" />
              <p>You have no pending access requests.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Requested Access</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="font-medium">{format(new Date(req.created_at), 'PPP')}</TableCell>
                    <TableCell>Dr. {req.doctor?.user?.full_name || 'Unknown'}</TableCell>
                    <TableCell className="text-slate-500">{req.report_id ? 'Specific Report' : 'Full History'}</TableCell>
                    <TableCell>
                      <Badge variant={req.status === 'approved' ? 'success' : req.status === 'pending' ? 'warning' : 'destructive'}>
                        {req.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      {req.status === 'pending' && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-emerald-600 hover:text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                            onClick={() => updateStatus(req.id, 'approved')}
                          >
                            <CheckCircle className="mr-1 h-4 w-4" /> Grant
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
                            onClick={() => updateStatus(req.id, 'rejected')}
                          >
                            <XCircle className="mr-1 h-4 w-4" /> Deny
                          </Button>
                        </>
                      )}
                      {req.status === 'approved' && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => updateStatus(req.id, 'rejected')}
                        >
                          Revoke Access
                        </Button>
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
