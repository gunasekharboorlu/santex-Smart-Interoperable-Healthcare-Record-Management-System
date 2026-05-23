import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Appointment, Patient, User, Doctor } from '../../types/database';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Skeleton } from '../../components/ui/skeleton';
import { Calendar as CalendarIcon, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

type ApptDetails = Appointment & {
  patient: Patient & { user: User };
  doctor: Doctor & { user: User };
};

export default function HospitalAppointments() {
  const [appointments, setAppointments] = useState<ApptDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        patient:patients(user:profiles(*)),
        doctor:doctors(user:profiles(*))
      `)
      .order('appointment_date', { ascending: true });

    if (!error && data) {
      setAppointments(data as any);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id);
    
    if (!error) {
      setAppointments(appointments.map(a => a.id === id ? { ...a, status } : a));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Appointments</h1>
          <p className="text-slate-500">Manage scheduling and upcoming appointments.</p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Upcoming Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : appointments.length === 0 ? (
            <div className="py-12 text-center text-slate-500 flex flex-col items-center">
              <CalendarIcon className="h-12 w-12 text-slate-300 mb-3" />
              <p>No appointments found in the system.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appt) => (
                  <TableRow key={appt.id}>
                    <TableCell className="font-medium">
                      {format(new Date(appt.appointment_date), 'PPP p')}
                    </TableCell>
                    <TableCell>{appt.patient?.user?.full_name || 'Unknown'}</TableCell>
                    <TableCell>Dr. {appt.doctor?.user?.full_name || 'Unknown'}</TableCell>
                    <TableCell>
                      <Badge variant={appt.status === 'completed' ? 'success' : appt.status === 'scheduled' ? 'default' : 'destructive'}>
                        {appt.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      {appt.status === 'scheduled' && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-emerald-600 hover:text-emerald-700"
                            onClick={() => updateStatus(appt.id, 'completed')}
                          >
                            <CheckCircle className="mr-1 h-4 w-4" /> Mark Done
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700"
                            onClick={() => updateStatus(appt.id, 'cancelled')}
                          >
                            Cancel
                          </Button>
                        </>
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
