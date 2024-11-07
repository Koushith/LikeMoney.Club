import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Twitter, Linkedin, Edit2, Save, X, Github, Globe, Youtube, Instagram } from 'lucide-react';
import { useParams } from 'react-router-dom';

export const ProfileScreen = () => {
  const { userId } = useParams();
  const mockUser = {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Frontend Developer',
    walletAddress: '0x123...abc',
    experience: ['5 years React development', 'Tech Lead at Company X'],
    socialMedia: [
      { platform: 'twitter', url: 'https://twitter.com/johndoe' },
      { platform: 'github', url: 'https://github.com/johndoe' },
    ],
    profilePicture: '/api/placeholder/96/96',
  };

  const profile = mockUser;
  const currentUser = { user: mockUser };
  const isProfileLoading = false;
  const isUserLoading = false;
  const isUpdating = false;

  const [editingSection, setEditingSection] = useState<'personal' | 'social' | null>(null);

  const toast = {
    toast: (params: any) => console.log('Toast:', params),
  };

  const [formData, setFormData] = useState<ProfileUpdateData>({
    name: '',
    bio: '',
    walletAddress: '',
    experience: [],
    socialMedia: [],
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name ?? '',
        bio: profile.bio ?? '',
        walletAddress: profile.walletAddress ?? '',
        experience: profile.experience ?? [],
        socialMedia:
          profile.socialMedia?.map((social: SocialMedia) => {
            return {
              platform: social.platform,
              url: social.url,
            };
          }) ?? [],
      });
    }
  }, []);

  const handleSocialMediaChange = (platform: SocialMedia['platform'], url: string) => {
    const currentSocials = [...(formData.socialMedia || [])];
    const existingIndex = currentSocials.findIndex((s) => s.platform === platform);

    if (existingIndex !== -1) {
      if (url) {
        currentSocials[existingIndex] = { platform, url };
      } else {
        currentSocials.splice(existingIndex, 1);
      }
    } else if (url) {
      currentSocials.push({ platform, url });
    }

    setFormData((prev) => ({
      ...prev,
      socialMedia: currentSocials,
    }));
  };

  const getSocialMediaUrl = (platform: SocialMedia['platform']) => {
    return formData.socialMedia?.find((s) => s.platform === platform)?.url || '';
  };

  const handleSave = async (section: 'personal' | 'social') => {
    try {
      console.log('Saving changes:', section, formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEditingSection(null);
      toast.toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    } catch (error) {
      console.log('error', error);
      toast.toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    }
  };

  const isOwnProfile = currentUser?.user?._id === (userId ? mockUser?._id : currentUser?.user?._id);

  if ((userId && isProfileLoading) || (!userId && isUserLoading) || !profile) {
    return <div>Loading...</div>;
  }

  const SOCIAL_PLATFORMS = [
    { id: 'twitter', icon: Twitter, label: 'Twitter' },
    { id: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
    { id: 'github', icon: Github, label: 'GitHub' },
    { id: 'website', icon: Globe, label: 'Website' },
    { id: 'youtube', icon: Youtube, label: 'YouTube' },
    { id: 'instagram', icon: Instagram, label: 'Instagram' },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="space-y-6 max-w-3xl mx-auto">
        {/* Profile Header */}
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center gap-8">
              <div className="relative w-32 h-32">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-background shadow-lg">
                  <img
                    src={profile?.profilePicture || '/api/placeholder/96/96'}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">{profile?.name}</h2>
                <p className="text-sm text-muted-foreground">{profile?.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Personal Information</CardTitle>
            {isOwnProfile && (
              <div className="flex gap-2">
                {editingSection === 'personal' ? (
                  <>
                    <Button variant="default" size="sm" onClick={() => handleSave('personal')} disabled={isUpdating}>
                      {isUpdating ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin">⏳</span> Saving...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Save className="h-4 w-4" /> Save Changes
                        </span>
                      )}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setEditingSection(null)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => setEditingSection('personal')}>
                    <Edit2 className="h-4 w-4 mr-2" /> Edit
                  </Button>
                )}
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name*</label>
                {editingSection === 'personal' ? (
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                ) : (
                  <p className="text-sm py-2">{profile?.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                {editingSection === 'personal' ? (
                  <Textarea
                    value={formData.bio}
                    onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                    className="min-h-[100px]"
                  />
                ) : (
                  <p className="text-sm py-2">{profile?.bio || 'No bio added'}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Wallet Address</label>
                {editingSection === 'personal' ? (
                  <Input
                    value={formData.walletAddress}
                    onChange={(e) => setFormData((prev) => ({ ...prev, walletAddress: e.target.value }))}
                    placeholder="Enter your wallet address"
                  />
                ) : (
                  <p className="text-sm py-2">{profile?.walletAddress || 'Not set'}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Experience</label>
                <div className="space-y-2">
                  {editingSection === 'personal' ? (
                    <>
                      {formData.experience?.map((exp, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={exp}
                            onChange={(e) => {
                              const newExp = [...(formData.experience || [])];
                              newExp[index] = e.target.value;
                              setFormData((prev) => ({ ...prev, experience: newExp }));
                            }}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newExp = (formData.experience || []).filter((_, i) => i !== index);
                              setFormData((prev) => ({ ...prev, experience: newExp }));
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            experience: [...(prev.experience || []), ''],
                          }));
                        }}
                      >
                        Add Experience
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-1">
                      {profile?.experience.map((exp, index) => (
                        <p key={index} className="text-sm py-1">
                          {exp}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media Links */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Social Media</CardTitle>
            {isOwnProfile && (
              <div className="flex gap-2">
                {editingSection === 'social' ? (
                  <>
                    <Button variant="default" size="sm" onClick={() => handleSave('social')} disabled={isUpdating}>
                      {isUpdating ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin">⏳</span> Saving...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Save className="h-4 w-4" /> Save Changes
                        </span>
                      )}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setEditingSection(null)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => setEditingSection('social')}>
                    <Edit2 className="h-4 w-4 mr-2" /> Edit
                  </Button>
                )}
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {SOCIAL_PLATFORMS?.map(
                ({ id, icon: Icon, label }: { id: string; icon: React.ElementType; label: string }) => (
                  <div key={id} className="flex items-center gap-4">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      {editingSection === 'social' ? (
                        <Input
                          value={getSocialMediaUrl(id as SocialMedia['platform'])}
                          onChange={(e) => handleSocialMediaChange(id as SocialMedia['platform'], e.target.value)}
                          placeholder={`Enter your ${label} URL`}
                        />
                      ) : (
                        <div className="space-y-1">
                          <label className="text-sm font-medium">{label}</label>
                          {getSocialMediaUrl(id as SocialMedia['platform']) ? (
                            <a
                              href={getSocialMediaUrl(id as SocialMedia['platform'])}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-500 hover:underline"
                            >
                              {getSocialMediaUrl(id as SocialMedia['platform'])}
                            </a>
                          ) : (
                            <p className="text-sm text-muted-foreground">Not set</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
