import { ArrowRight, BookOpen, Globe, Headphones } from "lucide-react";
import { Link } from "react-router-dom";

const Resources = () => {
  return (
    <section className="py-20 px-[5%] bg-[#1A1F2E]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Language Learning Resources
          </h2>
          <p className="text-lg text-[#E8ECEF] opacity-70">
            Everything you need to succeed in your language journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: BookOpen,
              title: "Learning Guides",
              description:
                "Comprehensive guides for each language with tips, tricks, and strategies",
              link: "/guides",
              gradient: "from-[#6C47FF] to-[#00D9C0]",
            },
            {
              icon: Headphones,
              title: "Pronunciation Guides",
              description:
                "Audio examples and phonetic breakdowns for perfect pronunciation",
              link: "/pronunciation",
              gradient: "from-[#FF6B9D] to-[#6C47FF]",
            },
            {
              icon: Globe,
              title: "Cultural Insights",
              description:
                "Deep dives into customs, etiquette, and cultural nuances",
              link: "/culture",
              gradient: "from-[#00D9C0] to-[#10B981]",
            },
          ].map((resource, index) => {
            const Icon = resource.icon;
            return (
              <Link
                to={resource.link}
                key={index}
                className="bg-[#0F1419] border border-[rgba(255,255,255,0.1)] rounded-2xl p-8 hover:border-[#6C47FF] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(108,71,255,0.2)] transition-all duration-300 group"
              >
                <div
                  className={`w-16 h-16 rounded-xl bg-linear-to-br ${resource.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {resource.title}
                </h3>
                <p className="text-[#E8ECEF] opacity-70 mb-4">
                  {resource.description}
                </p>
                <div className="flex items-center gap-2 text-[#6C47FF] font-semibold group-hover:gap-3 transition-all">
                  Explore <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Resources;
