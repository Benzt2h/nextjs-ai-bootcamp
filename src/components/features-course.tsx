import Image from "next/image";
import type { Course } from "@/types/course";

type Props = {
  courses: Course[];
}

const FeaturesCourse = ({ courses }: Props) => {
  return (
    <section className="w-full px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16">
          <h2 className="mx-auto text-center font-heading text-5xl md:text-6xl font-medium tracking-tight text-foreground">
            หลักสูตรทั้งหมด
          </h2>
          <p className="mt-4 text-center text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            ค้นหาหลักสูตรที่เหมาะสมสำหรับการพัฒนาทักษะของคุณ
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <article
              className="group flex flex-col text-start rounded-lg border border-border/50 bg-card hover:shadow-lg transition-all overflow-hidden"
              key={course.title}
            >
              {/* Image */}
              <div className="relative w-full aspect-video overflow-hidden bg-muted">
                <Image
                  alt={course.title}
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                  width={0}
                  height={0}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  src={course.picture}
                  loading="eager"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-3 flex-1">
                <h3 className="font-heading font-medium text-xl text-foreground line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {course.detail}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesCourse;
