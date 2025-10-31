'use client';
import React from 'react';
import { CalendarOutlined } from '@ant-design/icons';
import Link from 'next/link';

export const HorizontalPost: React.FC<{
  title?: string;
  description?: string;
  publishedTime?: string;
  img: string;
  alt: string;
  url: string;
}> = ({ title, description, publishedTime, img, alt, url }) => {
  return (
    <Link href={url} className="block">
      <div className=" h-50 flex px-4 py-2 flex-col md:flex-row rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white">
        {/* Image Section */}
        <div className="h-full">
          <img
            src={img}
            alt={alt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col justify-between md:w-1/2">
          <div>
            <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
            <p className="text-gray-700 text-sm">{description}</p>
          </div>
          <div className="flex items-center text-xs text-gray-500 mt-4 gap-1">
            <CalendarOutlined />
            <span>{publishedTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
