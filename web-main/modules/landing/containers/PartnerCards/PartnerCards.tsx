import { Card } from 'antd';
import Image from 'next/image';

import addis_ababa_university from '../../../../assets/partners/addis_ababa_university.jpg';
import cpu_college from '../../../../assets/partners/cpu_college.jpg';
import rift_valley_university from '../../../../assets/partners/rift_valley_university.jpg';
import national_college from '../../../../assets/partners/national_college.jpg';

const partners = [
  { name: 'Addis Ababa University', logo: addis_ababa_university, description: '', url: '#' },
  { name: 'CPU College', logo: cpu_college, description: '', url: '#' },
  { name: 'Rift Valley University', logo: rift_valley_university, description: '', url: '#' },
  { name: 'National College', logo: national_college, description: '', url: '#' },
];

export const PartnerCards = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-primary">Service Locations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card
                hoverable
                className="rounded-xl shadow-sm hover:shadow-md transition text-center"
              >
                <div className="p-4">
                  <Image
                    alt={partner.name}
                    src={partner.logo}
                    className="h-32 w-full object-contain mb-4"
                  />
                  <h3 className="font-semibold text-lg">{partner.name}</h3>
                  {partner.description && (
                    <p className="text-gray-500">{partner.description}</p>
                  )}
                </div>
              </Card>
            </a>
          ))}

          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-gray-600 text-center">
            <span className="text-xl font-semibold mb-2">...and many more</span>
            <span className="text-sm">Join a growing network of educational partners</span>
          </div>
        </div>
      </div>
    </section>
  );
};
