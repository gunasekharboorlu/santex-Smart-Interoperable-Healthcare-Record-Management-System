import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Report } from '../../types/database';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Skeleton } from '../../components/ui/skeleton';
import { FileText, Download, Trash2, UploadCloud } from 'lucide-react';
import { format } from 'date-fns';

export default function PatientReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    // Real implementation would filter by patient_id tied to this user
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (!error && data) {
      setReports(data);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Medical Reports</h1>
          <p className="text-slate-500">View and manage your personal health records and lab results.</p>
        </div>
        <Button className="bg-cyan-600 hover:bg-cyan-700">
          <UploadCloud className="mr-2 h-4 w-4" /> Upload Document
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Your Files</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : reports.length === 0 ? (
            <div className="py-12 text-center text-slate-500 flex flex-col items-center">
              <FileText className="h-12 w-12 text-slate-300 mb-3" />
              <p>You have no medical reports uploaded.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Document Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Privacy</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{format(new Date(report.uploaded_at), 'PPP')}</TableCell>
                    <TableCell>{report.title}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{report.report_type || 'General'}</Badge>
                    </TableCell>
                    <TableCell>
                      {report.is_sensitive ? (
                        <Badge variant="destructive">Sensitive</Badge>
                      ) : (
                        <Badge variant="outline">Standard</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="sm" className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50">
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 px-2">
                        <Trash2 className="h-4 w-4" />
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
