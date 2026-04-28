import { motion } from 'framer-motion';

const WhySaleixo = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', delay: i * 0.12 },
    }),
  };

  return (
    <section className="py-10 bg-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-6 max-w-4xl mx-auto"
        >
          <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-light text-foreground mb-6 tracking-tight">
            Why Saleixo?
          </motion.h2>
          <div className="space-y-4 text-left md:text-center">
            <motion.p variants={fadeUp} custom={1} className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Saleixo</strong> is a team of master photographers, editors & stylists, each bringing over{' '}
              <strong className="text-accent-violet">two decades of specialized expertise</strong> in luxury product photography.
            </motion.p>
            <motion.p variants={fadeUp} custom={2} className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Our international training from prestigious <strong className="text-primary">Australian universities</strong>, combined with extensive startup consulting experience, positions us as{' '}
              <strong className="text-foreground">India's premier digital photography studio</strong>.
            </motion.p>
            <motion.p variants={fadeUp} custom={3} className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              We've helped establish photography departments for major brands like{' '}
              <strong className="text-accent-violet">Pottery Barn, FNP, and Pepperfry</strong>, and continue to set industry standards.
            </motion.p>
          </div>
          <motion.p variants={fadeUp} custom={4} className="text-xl text-primary font-medium mt-8">
            From Lens to Launch – We handle everything: photography, design, and marketing.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhySaleixo;
