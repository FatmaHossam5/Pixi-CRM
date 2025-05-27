import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { use } from 'react';
import Select from 'react-select';
import { AuthContext } from '../../../../context/admin/AuthContext';
import useLocationData from '../../../../hooks/useLocationData';
import useSource from '../../../../hooks/useSource';

export default function CreateTeam({ onSubmit }) {
  const { base_url } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,

  } = useForm({
    defaultValues: {
      title: "",
      leader_id: "",
      sales_ids: [],
      location_id: ""
    }
  })
  const [leader, setLeader] = useState([]);
  const [sales, setSales] = useState([]);
  const {
    countries,
    cities,
    areas,
    selectedCountry,
    selectedCity,
    setSelectedCountry,
    setSelectedCity,
    setSelectedArea
  } = useLocationData();
  console.log(countries);
  const { source } = useSource();
  console.log(source);

  const fetchUsers = async (type) => {



    try {
      const res = await axios.get(`${base_url}/users`, {
        params: { type },
      });


      return res.data.data.data; // assume API returns an array of { id, name }
    } catch (err) {
      console.error(`Error fetching ${type}:`, err);
      return [];
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const leader = await fetchUsers('leader');
      console.log(leader);

      const sales = await fetchUsers('sales');
      setLeader(leader);
      setSales(sales);
    };
    fetchData();
  }, []);
  const handleCreate = async (values) => {
    console.log(values);

    const payload = {
      title: values.title,
      leader_id: values.leader_id,
      sales_ids: values.sales_ids.map((opt) => opt.value),
      location_id: values.location_id,
      source_id: values.source_id,
    };
    console.log(payload);

    try {
      await axios.post(`${base_url}/teams`, payload);
      reset();  // clear form if you like
      alert('Team created!');
    } catch (err) {
      console.error(err);
      alert('Failed to create team');
    }
  };
  return (
    <div className='container-fluid'>
      <form onSubmit={handleSubmit(handleCreate)} onReset={() => reset()}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Team Name</label>
          <input
            id="title"
            {...register('title', { required: 'Required' })}
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          // disabled={isSubmitting}
          />
          {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="leader" className="form-label">
            Team Lead
          </label>
          <select
            id="leader"
            {...register('leader_id', {
              required: 'Please select a team lead',
            })}
            className={`form-select ${errors.leader_id ? 'is-invalid' : ''
              }`}
          // disabled={isSubmitting}
          >
            <option value="">Select Team Lead</option>
            {leader.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
          {errors.leader_id && (
            <div className="invalid-feedback">
              {errors.leader_id.message}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="sales" className="form-label">Sales Agents</label>
          <Controller
            name="sales_ids"
            control={control}
            rules={{ validate: v => v && v.length > 0 || 'Choose at least one' }}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={sales.map(s => ({ value: s.id, label: s.name }))}
                classNamePrefix="react-select"
                placeholder="Select sales agents"
              // isDisabled={isSubmitting}
              />
            )}
          />
          {errors.sales_ids && (
            <div className="text-danger mt-1">
              {errors.sales_ids.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Country</label>
          <select
            className="form-select"
            value={selectedCountry ?? ''}
            onChange={(e) => {
              setSelectedCountry(+e.target.value);
              setSelectedCity(null);
              setSelectedArea(null);
            }}
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">City</label>
          <select
            className="form-select"
            value={selectedCity ?? ''}
            onChange={(e) => {
              setSelectedCity(+e.target.value);
              setSelectedArea(null);
            }}
            disabled={!selectedCountry}
          >
            <option value="">Select City</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Area</label>
          <select
            className="form-select"
            {...register('location_id', { required: 'Area is required' })}
            disabled={!selectedCity}
          >
            <option value="">Select Area</option>
            {areas.map((a) => (
              <option key={a.id} value={a.id}>{a.title}</option>
            ))}
          </select>
          {errors.location_id && <div className="text-danger mt-1">{errors.location_id.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="source" className="form-label">
            Source
          </label>
          <select
            id="source"
            {...register('source_id', {
              required: 'Please select a Source',
            })}
            className={`form-select ${errors.source_id ? 'is-invalid' : ''
              }`}
          // disabled={isSubmitting}
          >
            <option value="">Select source</option>
            {source.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
          {errors.leader_id && (
            <div className="invalid-feedback">
              {errors.leader_id.message}
            </div>
          )}
        </div>
        <div className='mt-3 d-flex gap-4 justify-content-end'>
          <button type='reset' className='btn btn-outline-primary' style={{
            width: "160px",
            height: "52px"
          }}>Clear</button>
          <button type="submit" className='btn btn-primary' style={{
            width: "160px",
            height: "52px"
          }}>Create</button>

        </div>
      </form>
    </div>
  )
}
