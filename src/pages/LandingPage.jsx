export default function LandingPage() {
    return (
        <div className="min-h-[80vh] bg-gray-50 flex flex-col items-center justify-center px-6 py-12 sm:px-12">
            <div className="max-w-5xl w-full text-center space-y-8 animate-fade-in">
                
                {/* Hero Section */}
                <div className="space-y-4">
                    <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight">
                        Manage Your Stable <br className="hidden sm:block" />
                        <span className="text-blue-600">Without the Stress</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto pt-4">
                        The all-in-one platform for equestrian professionals. Track horse health, coordinate your staff, and automate your schedule so you can spend less time at the desk and more time in the barn.
                    </p>
                </div>

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 text-left">
                    
                    {/* Feature 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-6">
                            🐴
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Automated Health Alerts</h3>
                        <p className="text-gray-500 leading-relaxed">
                            Never miss an appointment. Set custom schedules and get automated email notifications when your horses are overdue for Coggins tests or Farrier visits.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-2xl mb-6">
                            👥
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Team Management</h3>
                        <p className="text-gray-500 leading-relaxed">
                            Keep your whole team on the same page. Easily invite staff, assign manager roles, and oversee all your stable members from a single dashboard.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-2xl mb-6">
                            📊
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Centralized Dashboard</h3>
                        <p className="text-gray-500 leading-relaxed">
                            Whether you manage one private barn or multiple commercial facilities, organize everything in one clean, easy-to-use interface.
                        </p>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="pt-16 pb-4">
                    <p className="text-gray-500 text-sm sm:text-base">
                        Have questions or need support? Contact us at{' '}
                        <a 
                            href="mailto:christiancuevas@me.com" 
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            christiancuevas@me.com
                        </a>
                    </p>
                </div>

            </div>
        </div>
    );
}