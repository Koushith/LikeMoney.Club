import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, X } from 'lucide-react';
import { useCreateCampaignMutation } from '@/services/campaign.service';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface CampaignFormData {
  name: string;
  description: string;
  bannerImage?: string;
  budget: string;
  startDate: string;
  endDate: string;
  minViews: number;
  taggedBusinesses: string[];
}

interface FormErrors {
  name?: string;
  description?: string;
  bannerImage?: string;
  startDate?: string;
  endDate?: string;
  minViews?: string;
}

const TagInput = ({ tags, setTags }: { tags: string[]; setTags: React.Dispatch<React.SetStateAction<string[]>> }) => {
  const [input, setInput] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input) {
      e.preventDefault();
      console.log('input', input);
      setTags([...tags, input]);
      setInput('');
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 border rounded-md">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm flex items-center"
        >
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
  const [campaign, setCampaign] = useState<CampaignFormData>({
    name: '',
    description: '',
    bannerImage: '',
    budget: '',
    startDate: '',
    taggedBusinesses: [],
    endDate: '',
    minViews: 10,
  });
  const [taggedBusinesses, setTaggedBusinesses] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});

  const navigate = useNavigate();

  const [createCampaign, { isLoading, isError, error }] = useCreateCampaignMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCampaign((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!campaign.name.trim()) {
      newErrors.name = 'Campaign name is required';
    } else if (campaign.name.length < 3) {
      newErrors.name = 'Campaign name must be at least 3 characters';
    }

    // Description validation
    if (campaign.description && campaign.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    // Date validations
    const startDate = new Date(campaign.startDate);
    const endDate = new Date(campaign.endDate);
    const today = new Date();

    if (!campaign.startDate) {
      newErrors.startDate = 'Start date is required';
    } else if (startDate < today) {
      newErrors.startDate = 'Start date cannot be in the past';
    }

    if (campaign.endDate && endDate <= startDate) {
      newErrors.endDate = 'End date must be after start date';
    }

    // Min views validation
    if (!campaign.minViews) {
      newErrors.minViews = 'Minimum views is required';
    } else if (campaign.minViews <= 0) {
      newErrors.minViews = 'Minimum views must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the form errors before submitting');
      return;
    }
    try {
      //@ts-ignore
      const result = await createCampaign({
        ...campaign,
        budget: Number(campaign.budget),
        taggedBusiness: taggedBusinesses,
      }).unwrap();
      if (result) {
        console.log('Campaign created successfully');
        toast.success('Campaign created successfully');
        setCampaign({
          name: '',
          description: '',
          bannerImage: '',
          budget: '',
          startDate: '',
          endDate: '',
          minViews: 0,
          taggedBusinesses: [],
        });
        // Navigate to home screen
        navigate('/');
      }
    } catch (err) {
      console.error('Failed to create campaign:', err);
      toast.error('Failed to create campaign. Please try again.');
    }
  };

  return (
    <div className="container mx-auto py-10">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-zinc-950 dark:text-white mb-6">Create New Campaign</h1>

        {isError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {'An error occurred while creating the campaign.'}</span>
          </div>
        )}

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
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
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
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
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
                className={errors.bannerImage ? 'border-red-500' : ''}
              />
              {errors.bannerImage && <p className="text-sm text-red-500">{errors.bannerImage}</p>}
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
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Set your campaign's objectives, budget, and time constraints.
            </p>
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
                className={errors.minViews ? 'border-red-500' : ''}
              />
              {errors.minViews && <p className="text-sm text-red-500">{errors.minViews}</p>}
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                name="budget"
                type="number"
                value={campaign.budget}
                onChange={handleChange}
                placeholder="Enter campaign budget"
              />
            </div> */}
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
                  className={errors.startDate ? 'border-red-500' : ''}
                />
                {errors.startDate && <p className="text-sm text-red-500">{errors.startDate}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" name="endDate" type="date" value={campaign.endDate} onChange={handleChange} />
              </div>
            </div>
          </div>
        </section>

        <hr className="my-10 border-t border-zinc-200 dark:border-zinc-700" />

        <div className="flex justify-end gap-4">
          <Button type="reset" variant="outline" disabled={isLoading}>
            Reset
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Campaign'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
