export const NewsletterSignup = () => {
  return (
    <div className="bg-blue-600 text-white p-6 rounded-lg text-center my-8">
      <h2 className="text-xl font-bold mb-4">Stay Updated on Events</h2>
      <p className="mb-4">
        Subscribe to our newsletter and never miss out on upcoming events!
      </p>
      <form className="flex justify-center">
        <input
          type="email"
          placeholder="Enter your email"
          className="p-2 rounded-l-lg focus:outline-none text-black"
        />
        <button
          type="submit"
          className="bg-yellow-500 text-black font-semibold py-2 px-4 rounded-r-lg hover:bg-yellow-600"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};
