import {useCallback, useEffect, useState} from "react";
import SubmissionDetail from "../components/common/SubmissionDetail";
import {useParams} from "react-router";
import LoadingAnimation from "../../../components/ui/LoadingAnimation";
import {getSubmissionDetailsService} from "../../../services/submissionService";
import BackButton from "../../../components/common/BackButton";
import SectionHeader from "../../../components/ui/SectionHeader"
import Container from "../../../components/ui/Container";
import SubmissionActions from "../components/common/SubmissionActions";

export default function SubmissionDetailPage() {
  const { submissionId } = useParams();
  const [submission, setSubmission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getSubmissionDetailsService(submissionId)
      .then(({data}) => setSubmission(data))
      .catch((err) => setErrorMessage(err.message || "Gagal memuat pengajuan"))
      .finally(() => setIsLoading(false));
  }, [submissionId]);  

  if (isLoading) return <div className="flex min-h-screen items-center justify-center"><LoadingAnimation /></div>;
  if (errorMessage && !submission) return <div className="p-20 text-center font-bold text-red-500">{errorMessage}</div>;

  return (
    <Container className="mx-auto w-full">
      <div className="space-y-6">
        <BackButton />
        <section className="space-y-4">
          <SectionHeader color="bg-purple-500">Detail Permintaan</SectionHeader>
          {/* Komponen Common yang sudah dipisah */}
          <SubmissionDetail submission={submission} />
        </section>
        <section>
          <SubmissionActions submission={submission} onSuccess={(newSubmission) => setSubmission(newSubmission)}/>
        </section>
      </div>
    </Container>
  );  
}