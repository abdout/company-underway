// import Footer from "@/components/template/footer/footer"
import "../globals.css";
import PlatformHeader from "@/components/header-platform/platform-header"
import { MemberProvider } from "@/components/platform/member/context";
import { UploadProvider } from "@/components/upload/context";
import { ProjectProvider } from "@/components/platform/nmbd-project/context";
import { TaskProvider } from "@/components/platform/task/context";
import { MainProvider } from "@/provider/main";
import { ModalProvider } from "@/components/atom/modal/context";

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div data-wrapper="" className="px-4 md:px-8 lg:px-0 xl:px-32 2xl:px-48 border-grid flex flex-1 flex-col">
      <PlatformHeader />
      <main className="flex flex-1 flex-col pt-8">
      <MainProvider>
        <ProjectProvider>
          <TaskProvider>
            <UploadProvider>
              <MemberProvider>
                <ModalProvider>
                  {children}
                </ModalProvider>
              </MemberProvider>
            </UploadProvider>
          </TaskProvider>
        </ProjectProvider>
      </MainProvider>
      </main>
      {/* <Footer /> */}
    </div>
  )
}