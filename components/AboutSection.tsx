export default function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-6xl mx-auto px-4 space-y-10">
        <h2 className="text-3xl font-bold text-forest text-center">Why Work With Julia</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-semibold mb-2">Faster Responses</h3>
            <p className="text-slate">24/7 guest messaging under one hour.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Optimized Pricing</h3>
            <p className="text-slate">Dynamic rates tuned to demand.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Quality Control</h3>
            <p className="text-slate">Checklists and photo proof for every turnover.</p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-center">Time &amp; Stress Savings</h3>
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <span className="w-40">Owner-managed</span>
              <div className="flex-1 h-4 bg-forest" />
              <span className="ml-2">~25h</span>
            </div>
            <div className="flex items-center">
              <span className="w-40">With Julia</span>
              <div className="flex-1 h-4 bg-lake" />
              <span className="ml-2">~2h</span>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3 text-center">
            <div>🕒 Late-night calls: 4–6 → 0</div>
            <div>💬 Guest messages: handled</div>
            <div>🧹 Turnovers: managed</div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand">
              <tr>
                <th className="p-2"></th>
                <th className="p-2">Owner-Managed</th>
                <th className="p-2">With Julia</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-2">Guest Messaging</td>
                <td className="p-2">Delayed</td>
                <td className="p-2">24/7 &lt;1 hr</td>
              </tr>
              <tr className="border-t">
                <td className="p-2">Pricing</td>
                <td className="p-2">Static</td>
                <td className="p-2">Dynamic</td>
              </tr>
              <tr className="border-t">
                <td className="p-2">Guidebook</td>
                <td className="p-2">None</td>
                <td className="p-2">Touch Stay add-on</td>
              </tr>
              <tr className="border-t">
                <td className="p-2">Cleaning QC</td>
                <td className="p-2">Inconsistent</td>
                <td className="p-2">Checklists + photo proof</td>
              </tr>
              <tr className="border-t">
                <td className="p-2">Reviews/Ranking</td>
                <td className="p-2">Hit-or-miss</td>
                <td className="p-2">Superhost focus</td>
              </tr>
              <tr className="border-t">
                <td className="p-2">Reporting</td>
                <td className="p-2">Ad-hoc</td>
                <td className="p-2">Monthly summaries</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
