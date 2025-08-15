import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface AdminDashboardProps {
  onLogout: () => void;
}

// Mock data - will be replaced with Supabase queries
const mockUsers = [
  {
    id: 1,
    name: "JOHN SMITH",
    email: "john.smith@email.com",
    mobile: "+1234567890",
    acceptedAt: "2024-08-15 14:30:00",
    status: "ACCEPTED"
  },
  {
    id: 2,
    name: "JANE DOE",
    email: "jane.doe@email.com",
    mobile: "+1987654321",
    acceptedAt: "2024-08-15 15:45:00",
    status: "ACCEPTED"
  },
  {
    id: 3,
    name: "MIKE JOHNSON",
    email: "mike.j@email.com",
    mobile: "+1122334455",
    acceptedAt: "2024-08-15 16:20:00",
    status: "ACCEPTED"
  }
];

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(mockUsers);
  const { toast } = useToast();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults(mockUsers);
      return;
    }

    const filtered = mockUsers.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.mobile.includes(searchQuery)
    );

    setSearchResults(filtered);
    
    toast({
      title: "SEARCH EXECUTED",
      description: `Found ${filtered.length} matching records.`,
    });
  };

  return (
    <div className="min-h-screen brutal-grid bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-black tracking-tighter uppercase">
              ADMIN PANEL
            </h1>
            <p className="brutal-text mt-2">TERMS ACCEPTANCE MONITORING SYSTEM</p>
          </div>
          <Button
            onClick={onLogout}
            className="brutal-box-hover h-12 px-6 brutal-text font-bold uppercase bg-destructive hover:bg-destructive text-destructive-foreground"
          >
            LOGOUT
          </Button>
        </div>

        {/* Search Section */}
        <div className="brutal-box p-6 mb-8">
          <h2 className="brutal-subtitle mb-4">SEARCH RECORDS</h2>
          <div className="flex gap-4">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="brutal-input h-12 flex-1"
              placeholder="Search by name, email, or mobile number..."
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button
              onClick={handleSearch}
              className="brutal-box-hover h-12 px-8 brutal-text font-bold uppercase bg-brutal-accent hover:bg-brutal-accent text-foreground"
            >
              SEARCH
            </Button>
          </div>
        </div>

        {/* Results Section */}
        <div className="brutal-box p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="brutal-subtitle">ACCEPTANCE RECORDS</h2>
            <div className="brutal-box bg-brutal-accent/20 px-4 py-2">
              <span className="brutal-text font-bold">
                TOTAL: {searchResults.length} RECORDS
              </span>
            </div>
          </div>

          {searchResults.length === 0 ? (
            <div className="text-center py-12">
              <p className="brutal-text text-muted-foreground text-xl">
                NO MATCHING RECORDS FOUND
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-4 border-foreground">
                    <th className="text-left p-4 brutal-text font-bold uppercase">NAME</th>
                    <th className="text-left p-4 brutal-text font-bold uppercase">EMAIL</th>
                    <th className="text-left p-4 brutal-text font-bold uppercase">MOBILE</th>
                    <th className="text-left p-4 brutal-text font-bold uppercase">ACCEPTED AT</th>
                    <th className="text-left p-4 brutal-text font-bold uppercase">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((user, index) => (
                    <tr 
                      key={user.id} 
                      className={`border-b-2 border-border ${
                        index % 2 === 0 ? "bg-muted/50" : "bg-card"
                      }`}
                    >
                      <td className="p-4 brutal-text font-bold">{user.name}</td>
                      <td className="p-4 brutal-text">{user.email}</td>
                      <td className="p-4 brutal-text">{user.mobile}</td>
                      <td className="p-4 brutal-text">{user.acceptedAt}</td>
                      <td className="p-4">
                        <div className="brutal-box bg-brutal-accent/20 px-3 py-1 inline-block">
                          <span className="brutal-text font-bold text-xs">
                            {user.status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="brutal-box p-6 text-center">
            <h3 className="text-3xl font-black mb-2">{mockUsers.length}</h3>
            <p className="brutal-text font-bold">TOTAL ACCEPTANCES</p>
          </div>
          <div className="brutal-box p-6 text-center">
            <h3 className="text-3xl font-black mb-2 text-brutal-accent">100%</h3>
            <p className="brutal-text font-bold">COMPLIANCE RATE</p>
          </div>
          <div className="brutal-box p-6 text-center">
            <h3 className="text-3xl font-black mb-2 text-brutal-warning">ACTIVE</h3>
            <p className="brutal-text font-bold">SYSTEM STATUS</p>
          </div>
        </div>

        <div className="mt-8 p-4 border-2 border-brutal-warning bg-brutal-warning/10">
          <p className="brutal-text font-bold text-center">
            DATABASE INTEGRATION REQUIRED: Connect Supabase to enable live data functionality
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;