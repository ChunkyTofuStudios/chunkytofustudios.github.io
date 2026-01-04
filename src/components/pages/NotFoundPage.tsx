import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { HomeNavigation } from "../HomeNavigation";
import { Footer } from "../Footer";
import { Button } from "../ui/button";
import { Home, ArrowLeft } from "lucide-react";

type AppPage = 'home' | 'beehive' | 'pixel-buddy' | 'dozy';

export function NotFoundPage() {
    const navigate = useNavigate();

    const navigateToApp = (app: AppPage) => {
        if (app === 'home') {
            navigate('/');
        } else {
            navigate(`/${app}`);
        }
    };

    const handleGoHome = () => {
        navigate('/');
    };

    const handleGoBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <HomeNavigation />

            {/* Main 404 Content */}
            <main className="flex-grow flex items-center justify-center px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl w-full text-center"
                >
                    {/* Animated 404 */}
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{
                            duration: 0.5,
                            type: "spring",
                            stiffness: 200,
                            damping: 15
                        }}
                        className="mb-8"
                    >
                        <motion.h1
                            className="text-[12rem] md:text-[16rem] font-bold leading-none"
                            style={{
                                background: 'linear-gradient(135deg,rgb(234, 128, 102) 0%,rgb(162, 82, 75) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            404
                        </motion.h1>
                    </motion.div>

                    {/* Message */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-foreground">
                            Page Not Found
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground mb-2">
                            Oops! The page you're looking for doesn't exist.
                        </p>
                        <p className="text-base text-muted-foreground mb-8">
                            It might have been moved or deleted, or you may have mistyped the URL.
                        </p>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Button
                            onClick={handleGoHome}
                            size="lg"
                            className="gap-2 min-w-[160px]"
                        >
                            <Home className="w-4 h-4" />
                            Go to Home
                        </Button>
                        <Button
                            onClick={handleGoBack}
                            variant="outline"
                            size="lg"
                            className="gap-2 min-w-[160px]"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Go Back
                        </Button>
                    </motion.div>

                    {/* Current Path Display */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="mt-12 p-4 bg-muted rounded-lg"
                    >
                        <p className="text-sm text-muted-foreground font-mono break-all">
                            <span className="font-semibold">Requested path:</span>{' '}
                            {window.location.pathname}
                        </p>
                    </motion.div>

                    {/* Decorative Elements */}
                    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-6xl opacity-5"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    y: [0, -20, 0],
                                    rotate: [0, 10, -10, 0],
                                }}
                                transition={{
                                    duration: 3 + i,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.5,
                                }}
                            >
                                🎨
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </main>

            <Footer onAppClick={navigateToApp} />
        </div>
    );
}

