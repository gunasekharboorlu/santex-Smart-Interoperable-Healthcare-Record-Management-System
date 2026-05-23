import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Report, Patient, User } from '../../types/database';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Skeleton } from '../../components/ui/skeleton';
import { FileText, Download, Upload } from 'lucide-react';
import { format } from 'date-fns';

type ReportWithPatient = Report & {
  patient: Patient & { user: User };
};

export default function DoctorReports() {
  const [reports, setReports] = useState<ReportWithPatient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reports')
      .select(`
        *,
        patient:patients(user:profiles(*))
      `)
      .order('uploaded_at', { ascending: false });

    if (!error && data) {
      setReports(data as any);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Medical Reports</h1>
          <p className="text-slate-500">View and upload diagnostic reports and prescriptions.</p>
        </div>
        <Button className="bg-cyan-600 hover:bg-cyan-700">
          <Upload className="mr-2 h-4 w-4" /> Upload Report
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Uploaded Documents</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : reports.length === 0 ? (
            <div className="py-12 text-center text-slate-500 flex flex-col items-center">
              <FileText className="h-12 w-12 text-slate-300 mb-3" />
              <p>No reports found.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{format(new Date(report.uploaded_at), 'PPP')}</TableCell>
                    <TableCell>{report.title}</TableCell>
                    <TableCell>{report.patient?.user?.full_name || 'Unknown'}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{report.report_type || 'General'}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50">
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Button>
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
