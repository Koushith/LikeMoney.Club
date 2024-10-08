import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from 'lucide-react';

const TagInput = ({ tags, setTags }) => {
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && input) {
      e.preventDefault();
      setTags([...tags, input]);
      setInput('');
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 border rounded-md">
      {tags.map((tag, index) => (
        <span key={index} className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm flex items-center">
          {tag}
          <button type="button" onClick={() => removeTag(index)} className="ml-1 focus:outline-none">
            <X size={14} />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        className="flex-grow outline-none bg-transparent"
        placeholder="Type and press Enter"
      />
    </div>
  );
};

export const CreateCampaignScreen = () => {
  const [campaign, setCampaign] = useState({
    name: '',
    description: '',
    bannerImage: '',
    budget: '',
    startDate: '',
    endDate: '',
    minViews: '', // New field for minimum views
  });
  const [taggedBusinesses, setTaggedBusinesses] = useState([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCampaign(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Campaign submitted:', { ...campaign, taggedBusinesses });
  };

  return (
    <div className="container mx-auto py-10">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-zinc-950 dark:text-white mb-6">Create New Campaign</h1>
        
        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2 mb-10">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">Campaign Details</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Provide basic information about your campaign.</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Campaign Name</Label>
              <Input
                id="name"
                name="name"
                value={campaign.name}
                onChange={handleChange}
                placeholder="Enter campaign name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={campaign.description}
                onChange={handleChange}
                placeholder="Enter campaign description"
                rows={4}
              />
            </div>
          </div>
        </section>

        <hr className="my-10 border-t border-zinc-200 dark:border-zinc-700" />

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2 mb-10">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">Campaign Media</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Add visual elements to your campaign.</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bannerImage">Banner Image URL</Label>
              <Input
                id="bannerImage"
                name="bannerImage"
                value={campaign.bannerImage}
                onChange={handleChange}
                placeholder="Enter banner image URL"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taggedBusiness">Tagged Businesses</Label>
              <TagInput tags={taggedBusinesses} setTags={setTaggedBusinesses} />
            </div>
          </div>
        </section>

        <hr className="my-10 border-t border-zinc-200 dark:border-zinc-700" />

        <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2 mb-10">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">Campaign Goals and Timeline</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Set your campaign's objectives, budget, and time constraints.</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="minViews">Minimum Views</Label>
              <Input
                id="minViews"
                name="minViews"
                type="number"
                value={campaign.minViews}
                onChange={handleChange}
                placeholder="Enter minimum views target"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                name="budget"
                type="number"
                value={campaign.budget}
                onChange={handleChange}
                placeholder="Enter campaign budget"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={campaign.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={campaign.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </section>

        <hr className="my-10 border-t border-zinc-200 dark:border-zinc-700" />

        <div className="flex justify-end gap-4">
          <Button type="reset" variant="outline">Reset</Button>
          <Button type="submit">Create Campaign</Button>
        </div>
      </form>
    </div>
  );
};