// components/ProjectCard.js
import Image from 'next/image';
import { motion } from 'framer-motion';

const ProjectCard = ({ title, description, image, link }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="border rounded-lg overflow-hidden shadow-lg"
        >
            <div className="relative h-48">
                <Image
                    src={image}
                    fill
                    className="object-cover"
                    alt={title}
                    loading="lazy"
                />
            </div>
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                >
                    View Project →
                </a>
            </div>
        </motion.div>
    );
};

export default ProjectCard;