import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiExternalLink, FiYoutube } from 'react-icons/fi';

const YouTube = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Correctly structured single array for all your videos
    const mockVideos = [
      {
        id: 'BlhB8ivGHJA',
        title: 'AI Is Destroying Your Brainpower! 🧠',
        description: 'Discover how AI might be making you mentally lazy — and why the internet future could be a loop of broken, recycled knowledge.',
        thumbnail: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400',
        publishedAt: '2025-07-28',
        viewCount: '100'
      },
      {
        id: '16j5ZpaC0uU',
        title: 'This ONE Bug Nearly Started World War 3! 😱 (True Story)',
        description: 'The chilling true story of how a single error in Soviet computer code almost triggered a nuclear apocalypse in 1983.',
        thumbnail: 'https://images.pexels.com/photos/2088205/pexels-photo-2088205.jpeg?auto=compress&cs=tinysrgb&w=400',
        publishedAt: '2025-07-25',
        viewCount: '3,488'
      },
      {
        id: '16j5ZpaC0uU', // <-- PASTE ID HERE
        title: 'The Shocking Origin of the Word ‘Code’ 🔍💻',
        description: 'From ancient Latin wooden tablets to modern programming languages, this is the fascinating journey of the word ‘code’ through history.',
        thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400',
        publishedAt: '2025-07-22',
        viewCount: '4,537'
      },
      {
        id: 't5LygDJB24sE', // <-- PASTE ID HERE
        title: 'This Was the First Website EVER Made! 🌐',
        description: 'Uncovering the untold story behind the world\'s first website, built by Tim Berners-Lee in 1991 and still live today!',
        thumbnail: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=400',
        publishedAt: '2025-07-14',
        viewCount: '18,920'
      }
    ];

    setTimeout(() => {
      setVideos(mockVideos);
      setLoading(false);
    }, 1000);
  }, []); // The single useEffect hook wraps everything

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatViews = (views) => {
    return `${views} views`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FiYoutube className="w-12 h-12 text-red-500" />
            <h1 className="text-4xl md:text-5xl font-bold">YouTube Channel</h1>
          </div>
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
            I share my knowledge through tutorials, coding tips, and tech insights.
            Subscribe to stay updated with the latest web development content!
          </p>
          
          {/* Channel Stats */}
          <div className="stats stats-horizontal shadow-xl mt-8 bg-base-100">
            <div className="stat">
              <div className="stat-title">Subscribers</div>
              <div className="stat-value text-primary">132</div>
              <div className="stat-desc">Growing daily</div>
            </div>
            <div className="stat">
              <div className="stat-title">Total Views</div>
              <div className="stat-value text-secondary">150K</div>
              <div className="stat-desc">Across all videos</div>
            </div>
            <div className="stat">
              <div className="stat-title">Videos</div>
              <div className="stat-value text-accent">50+</div>
              <div className="stat-desc">Tutorials & tips</div>
            </div>
          </div>
        </motion.div>

        {/* Featured Video */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Latest Video</h2>
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${videos[0]?.id}`}
                title={videos[0]?.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold mb-2">{videos[0]?.title}</h3>
              <p className="text-base-content/70 mb-4">{videos[0]?.description}</p>
              <div className="flex items-center justify-center gap-4 text-sm text-base-content/60">
                <span>{formatViews(videos[0]?.viewCount || '0')}</span>
                <span>•</span>
                <span>{formatDate(videos[0]?.publishedAt || '')}</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Video Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">More Videos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.slice(1).map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <figure className="relative group">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-circle btn-primary btn-lg"
                    >
                      <FiPlay className="w-6 h-6" />
                    </a>
                  </div>
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-lg line-clamp-2">{video.title}</h3>
                  <p className="text-base-content/70 text-sm line-clamp-3 mb-4">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-base-content/60 mb-4">
                    <span>{formatViews(video.viewCount)}</span>
                    <span>{formatDate(video.publishedAt)}</span>
                  </div>
                  <div className="card-actions justify-end">
                    <a
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      <FiExternalLink className="w-4 h-4 mr-2" />
                      Watch
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Subscribe CTA */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Like what you see?</h2>
            <p className="text-xl text-base-content/70 mb-8 max-w-2xl mx-auto">
              Subscribe to my YouTube channel for weekly tutorials, coding tips, and tech reviews.
              Join our growing community of developers!
            </p>
            <a
              href="https://www.youtube.com/@NavSunTech"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              <FiYoutube className="w-6 h-6 mr-2" />
              Subscribe Now
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default YouTube;